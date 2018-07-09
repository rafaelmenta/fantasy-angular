import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AdminTeam, AdminTeamInfo } from '../service/team/admin-team';
import { AdminTeamService } from '../service/team/admin-team.service';
import { sortAlphabetically, compare, sortPlayers } from '../../../lib/utils';
import { map, tap } from 'rxjs/operators';
import { AdminLeagueService } from '../service/league/admin-league.service';
import { AdminDivision } from '../service/league/admin-league';
import { AdminFreeAgent } from '../service/player/admin-player';
import { AdminUser } from '../service/user/admin-user';
import { AdminUserService } from '../service/user/admin-user.service';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.css']
})
export class AdminTeamComponent implements OnInit {

  teams$: Observable<AdminTeam[]>;
  team$: Observable<AdminTeamInfo>;
  divisions$: Observable<AdminDivision[]>;
  freeAgents$: Observable<AdminFreeAgent[]>;
  users$: Observable<AdminUser[]>;
  roster$: Observable<AdminTeamInfo>;
  combined$: Observable<[AdminTeam[], AdminUser[]]>;


  loadFreeAgents(team: AdminTeamInfo) {
    this.freeAgents$ = this.league.getLeagueFreeAgents(team.division.conference.league.id_league)
    .pipe(map(players => players.sort(sortPlayers)));
  }

  loadUsers() {
    this.users$ = this.user.getUsers().pipe(
      map(users => users.sort((a, b) => compare(a.nickname, b.nickname, true)))
    );
  }

  loadTeam(teamRef: AdminTeam) {
    this.team$ = this.team.getTeam(teamRef.id_sl).pipe(
      tap(team => team.players = team.players.sort((a, b) => compare(a.team_info.order, b.team_info.order, true))),
      tap(team => this.divisions$ = this.league.getLeagueDivisions(team.division.conference.league.id_league)),
      tap(this.loadFreeAgents.bind(this)),
    );
  }

  ngOnInit() {
    this.teams$ = this.team.getTeams().pipe(
      map(teams => teams.sort((a, b) => sortAlphabetically(a, b))),
    );
    this.loadUsers();
    this.combined$ = forkJoin(this.teams$, this.users$);
  }

  constructor(
    private team: AdminTeamService,
    private user: AdminUserService,
    private league: AdminLeagueService,
  ) { }
}
