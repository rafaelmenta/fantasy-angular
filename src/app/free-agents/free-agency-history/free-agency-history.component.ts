import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { Observable, merge } from 'rxjs';
import { LeagueService } from '../../services/league/league.service';
import { FreeAgencyHistory } from '../../../typings';
import { map, filter, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-free-agency-history',
  templateUrl: './free-agency-history.component.html',
  styleUrls: ['./free-agency-history.component.css']
})
export class FreeAgencyHistoryComponent implements OnInit {

  faHistory$: Observable<FreeAgencyHistory[]>;

  constructor(
    private leagueService: LeagueService,
    private teamService: TeamService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.faHistory$ = this.userService.user.pipe(
      filter(user => user !== undefined),
      map(user => this.teamService.getDefaultTeam(user.teams)),
      mergeMap(team => this.leagueService.getFreeAgentsHistory(team.team.division.conference.league.id_league)),
    );
  }

}
