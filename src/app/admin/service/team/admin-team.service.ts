import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { share, map } from 'rxjs/operators';
import { AdminTeam, AdminTeamInfo, AdminTeamInfoInput } from './admin-team';
import { AdminFreeAgent, AdminTeamPlayer } from '../player/admin-player';

@Injectable({
  providedIn: 'root'
})
export class AdminTeamService {

  getTeams() {
    const url = `${this.config.API_ENDPOINT}teams`;
    return this.http.get<{ teams: AdminTeam[] }>(url).pipe(
      map(res => res.teams),
      share()
    );
  }

  getTeam(id: number) {
    const url = `${this.config.API_ENDPOINT}teams/${id}`;
    return this.http.get<{ team_overview: AdminTeamInfo }>(url).pipe(
      map(res => res.team_overview),
      share()
    );
  }

  saveTeamInfo(team: AdminTeamInfoInput) {
    const url = `${this.config.API_ENDPOINT}teams/${team.id_sl}`;
    return this.http.post<{ updateTeamInfo: number[] }>(url, team).pipe(share());
  }

  addPlayer(team: AdminTeamInfo, player: AdminFreeAgent) {
    const url = `${this.config.API_ENDPOINT}teams/${team.id_sl}/player`;

    const body = {
      team_info: {
        id_player: player.id_player,
        id_sl: team.id_sl,
        id_league: team.division.conference.league.id_league,
        primary_position: player.default_primary,
        secondary_position: player.default_secondary,
      }
    };

    return this.http.post<{ recruitPlayer: { id_player: number } }>(url, body).pipe(share());
  }

  removePlayer(team: AdminTeamInfo, player: AdminTeamPlayer) {
    const url = `${this.config.API_ENDPOINT}teams/${team.id_sl}/roster/${player.id_player}`;
    return this.http.delete<{ dumpPlayer: number }>(url).pipe(share());
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) { }
}
