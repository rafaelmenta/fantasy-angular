import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, merge, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, filter, map, mergeMap, share, take, tap } from 'rxjs/operators';
import { compare } from 'src/lib/utils';
import { isString } from 'util';
import { Auction, AuctionService, AuctionStatus, PlayerBid } from '../services/auction/auction.service';
import { LeagueService } from '../services/league/league.service';
import { PlayerLookup } from '../services/player/player.service';
import { SalaryCap, TeamLookup, TeamService } from '../services/team.service';
import { User, UserService, UserTeam } from '../services/user.service';
import { AuctionPanelComponent } from './auction-panel/auction-panel.component';
import { AvailableAuctionPlayersComponent } from './available-auction-players/available-auction-players.component';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {

  @ViewChild(AuctionPanelComponent) auctionPanel: AuctionPanelComponent;
  @ViewChild(AvailableAuctionPlayersComponent) availablePlayers: AvailableAuctionPlayersComponent;

  pageReady$: Observable<{ auctions: Auction[]; selectedAuction: { bids: PlayerBid[]; free_agents: PlayerLookup[] }; }>;
  defaultTeam: UserTeam;

  selectedAuction$: Observable<{ bids: PlayerBid[]; free_agents: PlayerLookup[] }>;
  auctionInfo$: Observable<Auction>;
  auctions$: Observable<Auction[]>;
  cap$: Observable<{cap: SalaryCap, waiver: number}>;
  auctionSubject = new ReplaySubject<{
    bids: PlayerBid[];
    free_agents: PlayerLookup[];
    cap: SalaryCap;
    waiver: number;
  }>();

  subObs = this.auctionSubject.asObservable();

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private leagueService: LeagueService,
    private auctionService: AuctionService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.title.setTitle(`Superliga - Leilão`);
  }

  private loadPageData() {
    const team$ = this.userService.user.pipe(
      filter(user => user !== undefined),
      map(user => this.teamService.getDefaultTeam(user.teams)),
    );

    this.auctions$ = team$.pipe(
      mergeMap(team => this.leagueService.getAuctions(team.team.division.conference.league.id_league)),
      map(auctions => auctions.sort((a, b) => compare(a.date_ended, b.date_ended, false))),
      share(),
    );

    this.cap$ = team$.pipe(
      mergeMap(team => this.teamService.getSalaryCap(team.id_sl)),
      share(),
    );

    const id$ = this.route.paramMap.pipe(map(paramMap => paramMap.get('id')));

    this.auctionInfo$ = combineLatest(id$, this.auctions$).pipe(
      map(([id, auctions]) => {
        if (isString(id)) {
          return auctions.find(auction => auction.id_auction === Number(id));
        }
        return auctions.find(auction => auction.status === AuctionStatus.OPEN);
      }),
      share()
    );

    this.selectedAuction$ = this.auctionInfo$.pipe(
      mergeMap(auction => this.auctionService.getAuctionPlayers(auction.id_auction)),
      share(),
    );

    this.userService.user.subscribe(this.onUserLoad.bind(this));

    this.pageReady$ = combineLatest(this.auctions$, this.auctionInfo$, this.selectedAuction$, this.cap$).pipe(
      map(([auctions, auctionInfo, selectedAuction, cap]) => ({
        auctions,
        auctionInfo,
        selectedAuction,
        cap
      })),
      tap(({selectedAuction, cap}) => this.auctionSubject.next({ ...selectedAuction, ...cap})),
      share(),
    );
  }

  refreshData(auction: Auction) {
    const freshCap$ = this.teamService.getSalaryCap(this.defaultTeam.id_sl);
    const freshPlayers$ = this.auctionService.getAuctionPlayers(auction.id_auction);

    combineLatest(freshCap$, freshPlayers$).pipe(
      map(([res, players]) => ({res, players}))
    ).subscribe(({res, players}) => this.auctionSubject.next({...players, ...res}));
  }

  onUserLoad(user?: User) {
    if (user) {
      this.defaultTeam = this.teamService.getDefaultTeam(user.teams);
      // Force load so team store is initialized
      this.teamService.getTeam(this.defaultTeam.id_sl, true).subscribe();
    }
  }

  sendTeamBid(idAuction: number, playerBid: PlayerBid) {
    playerBid.id_auction = idAuction;
    playerBid.team = {
      id_sl: this.defaultTeam.id_sl,
      city: this.defaultTeam.team.city,
      nickname: this.defaultTeam.team.nickname,
      slug: this.defaultTeam.team.slug,
      primary_color: null,
      secondary_color: null,
      symbol: null,
    };

    this.auctionService.sendBid(playerBid)
      .pipe(
        catchError(e => {
          this.showErrorMessage(e);
          return of().pipe(take(0));
        }),
      )
      .subscribe(this.onSuccessSend.bind(this));
  }

  showErrorMessage(e: string) {
    let message;
    switch (e) {
      case 'SALARY_EXCEEDS_CAP': message = 'Erro: O salário oferecido excede o cap do time.'; break;
      case 'NO_CAP_FOR_BID': message = 'Erro: Equipe não possui cap suficiente.'; break;
      case 'BID_IS_LOWER': message = 'Erro: O salário oferecido é menor que o bid atual.'; break;
      case 'BID_EXCEEDS_ROSTER': message = 'Erro: O limite de roster foi atingido.'; break;
      case 'SALARY_LOWER_MIN_BID': message = 'Erro: Salário oferecido abaixo do mínimo.'; break;
      case 'SALARY_HIGHER_MAX_BID': message = 'Erro: Salário oferecido acima do máximo.'; break;
      case 'SALARY_NOT_IN_INCREMENTS': message = 'Erro: Salário oferecido com incremento incorreto.'; break;
      default: message = `Erro ao salvar bid: ${e} `;
    }

    this.snackbar.open(message, null, {duration: 3000});
  }

  onSuccessSend(bid: PlayerBid) {
    this.auctionPanel.addBid(bid);
    this.refreshData({id_auction: bid.id_auction} as Auction);
    this.availablePlayers.refreshAvailablePlayers();
    this.snackbar.open(
      `Bid em ${bid.player.first_name} ${bid.player.last_name} lançado.`,
      null,
      { duration: 3000});
  }

  isOpen(auction: Auction) {
    return auction.status === AuctionStatus.OPEN;
  }

}
