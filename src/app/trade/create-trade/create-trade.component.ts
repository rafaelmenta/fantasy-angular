import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';

import { Angulartics2 } from 'angulartics2';
import { Observable, Subscription } from 'rxjs';
import { filter, tap, map, mergeAll, mergeMap, combineLatest } from 'rxjs/operators';

import { APP_CONFIG, AppConfig } from '../../app.config';

import { TradeTeamComponent } from '../trade-team/trade-team.component';
import { AcceptTradeComponent } from '../accept-trade/accept-trade.component';

import { TeamService, Team } from '../../services/team.service';
import { LeagueService } from '../../services/league/league.service';
import { UserService } from '../../services/user.service';
import { Player } from '../../services/player/player.service';
import { SentTrade, TradePlayer, TradeService } from '../../services/trade/trade.service';
import { Pick } from '../../services/pick/pick.service';

import { flatTeams, sortAlphabetically } from '../../../lib/utils';

@Component({
  selector: 'app-create-trade',
  templateUrl: './create-trade.component.html',
  styleUrls: ['./create-trade.component.css']
})
export class CreateTradeComponent implements OnInit, OnDestroy {

  @ViewChild('sender') sender: TradeTeamComponent;
  @ViewChild('receiver') receiver: TradeTeamComponent;

  teams$: Observable<Team[]>;
  team$: Observable<Team['team_overview']>;
  tradingTeam: Team['team_overview'];
  tradingTeam$: Observable<Team>;
  teamDatasource = new MatTableDataSource<Player>();
  validTrade: boolean;
  mobileBreakpoint: boolean;

  proposal: SentTrade;

  activeSubscriptions = [] as Subscription[];

  updateTeam(type: 'sent'|'received', $event: {players: Player[], picks: Pick[]}) {
    if (type === 'sent') {
      this.proposal.sender_players = $event.players.map<TradePlayer>(player => {
        return  {
          ...player,
          default_primary: player.team_info.primary_position,
          default_secondary: player.team_info.secondary_position,
        };
      });
      this.proposal.sender_picks = $event.picks;
    } else {
      this.proposal.receiver_players = $event.players.map<TradePlayer>(player => {
        return {
          ...player,
          default_primary: player.team_info.primary_position,
          default_secondary: player.team_info.secondary_position,
        };
      });
      this.proposal.receiver_picks = $event.picks;
    }
    const validSender = this.proposal.sender_picks.length > 0 || this.proposal.sender_players.length > 0;
    const validReceiver = this.proposal.receiver_picks.length > 0 || this.proposal.receiver_players.length > 0;
    this.validTrade = validSender && validReceiver;
  }

  private createTrade(proposal: SentTrade) {
    const prop = this.team$.pipe(
      mergeMap(team => this.tradeService.createTrade(team, proposal)),
      tap(() => {
        this.resetTrade();
        this.sender.clearSelection();
        this.receiver.clearSelection();
      }),
      combineLatest(this.team$),
      tap(combined => {
        this.angulartics2.eventTrack.next({
          action: 'send-trade',
          properties: {
            category: combined[1].slug,
          }
        });
        this.snackbar.open('Troca enviada', null, { duration: 5000 });
      })
    );

    this.activeSubscriptions.push(prop.subscribe());
  }

  sendTrade() {
    const dialogRef = this.dialog.open(AcceptTradeComponent, {
      data: { trade: this.proposal },
    });

    this.activeSubscriptions.push(dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.createTrade(this.proposal);
      }
    }));
  }

  selectTeam(team: Team['team_overview']) {
    this.tradingTeam$ = this.teamService.getTeamRoster(team.id_sl);
    this.activeSubscriptions.push(this.tradingTeam$.subscribe(leagueTeam => {
      this.tradingTeam = leagueTeam.team_overview;
      this.proposal.receiver_players = [];
      this.proposal.receiver_picks = [];
      this.proposal.receiver = {
        id_sl: leagueTeam.team_overview.id_sl,
        city: leagueTeam.team_overview.city,
        nickname: leagueTeam.team_overview.nickname,
        slug: leagueTeam.team_overview.slug,
      };
    }));
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private snackbar: MatSnackBar,
    private userService: UserService,
    private teamService: TeamService,
    private tradeService: TradeService,
    private title: Title,
    private angulartics2: Angulartics2,
    private dialog: MatDialog,
    private breakpoint$: BreakpointObserver,
    private leagueService: LeagueService) { }

  ngOnInit() {
    this.title.setTitle(`Superliga - Propor troca`);

    const team$ = this.userService.user.pipe(
      filter(user => user !== undefined),
      tap(() => this.newTrade()),
      map(user => this.teamService.getDefaultTeam(user.teams)),
    );

    this.team$ = team$.pipe(
      map(team => this.teamService.getTeam(team.id_sl, true)),
      mergeAll(),
      filter(team => team !== undefined),
      tap(team => this.teamDatasource.data = team.team_overview.players),
      map(team => team.team_overview),
    );

    this.teams$ = team$.pipe(
      mergeMap(team => this.leagueService.getUserLeague(team.team.division.conference.league.id_league)),
      filter(league => league !== undefined),
      combineLatest(team$),
      map(combined => flatTeams(combined[0])
        .filter((leagueTeam: Team['team_overview']) => combined[1].id_sl !== leagueTeam.id_sl)
        .sort(sortAlphabetically))
    );

    const sub = this.breakpoint$.observe(this.config.LARGE_MOBILE_QUERY)
      .subscribe(res => this.mobileBreakpoint = res.matches);
    this.activeSubscriptions.push(sub);
  }

  ngOnDestroy() {
    this.activeSubscriptions.forEach(sub => sub.unsubscribe());
  }

  resetTrade() {
    this.proposal.receiver_players = [];
    this.proposal.receiver_picks = [];
    this.proposal.sender_players = [];
    this.proposal.sender_picks = [];
  }

  newTrade() {
    this.proposal = this.getNewTradeObject();
    this.tradingTeam$ = null;
    this.tradingTeam = null;
  }

  getNewTradeObject(): SentTrade {
    this.validTrade = false;
    return {
      id_trade: undefined,
      receiver: undefined,
      receiver_players: [],
      receiver_picks: [],
      sender_players: [],
      sender_picks: [],
      trade_comment: undefined,
      views: undefined,
    };
  }

}
