import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Team, TeamService } from '../../services/team.service';
import { Observable } from 'rxjs';
import { FreeAgencyHistory } from 'typings';
import { LeagueService } from '../../services/league/league.service';

@Component({
  selector: 'app-free-agency-history',
  templateUrl: './free-agency-history.component.html',
  styleUrls: ['./free-agency-history.component.css']
})
export class FreeAgencyHistoryComponent implements OnInit {

  defaultTeam: Team;
  faHistory$: Observable<FreeAgencyHistory[]>;

  constructor(
    private leagueService: LeagueService,
    private teamService: TeamService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      if (user) {
        this.defaultTeam = this.teamService.getDefaultTeam(user.teams);
        const id = this.defaultTeam.team.division.conference.league.id_league;

        this.faHistory$ = this.leagueService.getFreeAgentsHistory(id);
      }
    });

  }

}
