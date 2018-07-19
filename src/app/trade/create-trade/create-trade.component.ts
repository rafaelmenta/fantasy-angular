import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { TeamService, Team } from '../../services/team.service';
import { LeagueService } from '../../services/league/league.service';
import { UserService } from '../../services/user.service';
import { flatTeams, sortAlphabetically } from '../../../lib/utils';
import { MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { Player } from '../../services/player/player.service';
import { SentTrade, TradePlayer, TradeService } from '../../services/trade/trade.service';
import { Pick } from '../../services/pick/pick.service';
import { TradeTeamComponent } from '../trade-team/trade-team.component';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';
import { AcceptTradeComponent } from '../accept-trade/accept-trade.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { APP_CONFIG, AppConfig } from '../../app.config';

@Component({
  selector: 'app-create-trade',
  templateUrl: './create-trade.component.html',
  styleUrls: ['./create-trade.component.css']
})
export class CreateTradeComponent implements OnInit {

  @ViewChild('sender') sender: TradeTeamComponent;
  @ViewChild('receiver') receiver: TradeTeamComponent;

  teams: Team[];
  team: Team['team_overview'];
  tradingTeam: Team['team_overview'];
  tradingTeam$: Observable<Team>;
  teamDatasource = new MatTableDataSource<Player>();
  validTrade: boolean;
  mobileBreakpoint: boolean;

  proposal: SentTrade;

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
    this.tradeService.createTrade(this.team, this.proposal).subscribe(res => {
      this.resetTrade();
      this.sender.clearSelection();
      this.receiver.clearSelection();
      this.angulartics2.eventTrack.next({
        action: 'send-trade',
        properties: {
          category: this.team.slug,
        }
      });
      this.snackbar.open('Troca enviada', null, { duration: 5000 });
    });
  }

  sendTrade() {
    const dialogRef = this.dialog.open(AcceptTradeComponent, {
      data: { trade: this.proposal },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.createTrade(this.proposal);
      }
    });
  }

  selectTeam(team: Team['team_overview']) {
    this.tradingTeam$ = this.teamService.getTeamRoster(team.id_sl);
    this.tradingTeam$.subscribe(leagueTeam => {
      this.tradingTeam = leagueTeam.team_overview;
      this.proposal.receiver_players = [];
      this.proposal.receiver_picks = [];
      this.proposal.receiver = {
        id_sl: leagueTeam.team_overview.id_sl,
        city: leagueTeam.team_overview.city,
        nickname: leagueTeam.team_overview.nickname,
        slug: leagueTeam.team_overview.slug,
      };
    });
  }

  constructor(
    private snackbar: MatSnackBar,
    private userService: UserService,
    private teamService: TeamService,
    private tradeService: TradeService,
    private title: Title,
    private angulartics2: Angulartics2,
    private dialog: MatDialog,
    @Inject(APP_CONFIG) private config: AppConfig,
    private breakpoint$: BreakpointObserver,
    private leagueService: LeagueService) { }

  ngOnInit() {
    this.title.setTitle(`Superliga - Propor troca`);
    this.userService.user.subscribe(user => {
      if (user) {
        this.proposal = this.getNewTrade();
        this.tradingTeam$ = null;
        this.tradingTeam = null;

        const team = this.teamService.getDefaultTeam(user.teams);
        const id = team.team.division.conference.league.id_league;

        this.teamService.getTeam(team.id_sl, true).subscribe(userTeam => {
          if (!userTeam) {
            return;
          }
          this.team = userTeam.team_overview;
          this.teamDatasource.data = userTeam.team_overview.players;
        });

        this.leagueService.getUserLeague(id).subscribe(res => {
          if (!res) {
            return;
          }
          this.teams = flatTeams(res)
            .filter((leagueTeam: Team['team_overview']) => team.id_sl !== leagueTeam.id_sl)
            .sort(sortAlphabetically);
        });
      }
    });

    this.breakpoint$.observe(this.config.LARGE_MOBILE_QUERY)
      .subscribe(res => this.mobileBreakpoint = res.matches);
  }

  resetTrade() {
    this.proposal.receiver_players = [];
    this.proposal.receiver_picks = [];
    this.proposal.sender_players = [];
    this.proposal.sender_picks = [];
  }

  getNewTrade(): SentTrade {
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
