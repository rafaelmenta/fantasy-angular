import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { LeagueService } from '../../services/league/league.service';
import { Observable } from 'rxjs';
import { Trade } from '../../services/trade/trade.service';
import { map, filter, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.css']
})
export class TradeHistoryComponent implements OnInit {

  trades$: Observable<Trade[]>;

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) { }

  ngOnInit() {
    this.trades$ = this.userService.user.pipe(
      filter(user => user !== undefined),
      map(user => this.teamService.getDefaultTeam(user.teams)),
      map(team => this.leagueService.getTradeHistory(team.team.division.conference.league.id_league)),
      mergeAll(),
    );
  }

}
