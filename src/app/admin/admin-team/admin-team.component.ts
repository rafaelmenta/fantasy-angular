import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { AdminTeam, AdminTeamInfo, AdminTeamInfoInput } from '../service/team/admin-team';
import { AdminTeamService } from '../service/team/admin-team.service';
import { sortAlphabetically, compare, sortPlayers } from '../../../lib/utils';
import { map, tap } from 'rxjs/operators';
import { AdminLeagueService } from '../service/league/admin-league.service';
import { AdminDivision } from '../service/league/admin-league';
import { AdminFreeAgent, AdminTeamPlayer } from '../service/player/admin-player';
import { AdminUser } from '../service/user/admin-user';
import { AdminUserService } from '../service/user/admin-user.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';

@Component({
  selector: 'app-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.css']
})
export class AdminTeamComponent implements OnInit {

  teams$: Observable<AdminTeam[]>;
  team$: Observable<AdminTeamInfo>;
  divisions$: Observable<AdminDivision[]>;
  freeAgents: AdminFreeAgent[];
  roster$: Observable<AdminTeamInfo>;
  combined$: Observable<AdminTeam[]>;


  loadFreeAgents(team: AdminTeamInfo) {
    this.league.getLeagueFreeAgents(team.division.conference.league.id_league)
    .pipe(map(players => players.sort(sortPlayers))).subscribe(fa => this.freeAgents = fa);
  }

  loadTeam(teamRef: AdminTeam) {
    this.team$ = this.team.getTeam(teamRef.id_sl).pipe(
      tap(team => team.players = team.players.sort((a, b) => compare(a.team_info.order, b.team_info.order, true))),
      tap(team => this.divisions$ = this.league.getLeagueDivisions(team.division.conference.league.id_league)),
      tap(this.loadFreeAgents.bind(this)),
    );
  }

  onTeamUpdate(teams: AdminTeam[], $event: AdminTeamInfoInput) {
    teams.forEach(team => {
      if (team.id_sl === $event.id_sl) {
        team.city = $event.city;
        team.nickname = $event.nickname;
      }
    });
  }

  onAddTeamPlayer(team: AdminTeamInfo, $event: AdminFreeAgent) {
    this.team.addPlayer(team, $event).subscribe(res => {
      if (res.recruitPlayer) {
        this.snackbar.open('Jogador adicionado', null, {duration: 3000});
      }
    });
  }

  onRemoveTeamPlayer(team: AdminTeamInfo, $event: AdminTeamPlayer) {
    this.team.removePlayer(team, $event).subscribe(res => {
      if (res.dumpPlayer) {
        this.snackbar.open('Jogador removido', null, {duration: 3000});
      }
    });
  }

  ngOnInit() {
    this.teams$ = this.team.getTeams().pipe(
      map(teams => teams.sort((a, b) => sortAlphabetically(a, b))),
    );
    // this.combined$ = this.teams$;
  }

  constructor(
    private team: AdminTeamService,
    private snackbar: MatSnackBar,
    private league: AdminLeagueService,
  ) { }
}
