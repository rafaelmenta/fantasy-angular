import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Player } from './player/player.service';
import { User } from './user.service';
import { Game } from './game/game.service';
import { TeamTrades } from './trade/trade.service';
import { Store, select } from '@ngrx/store';
import { UPDATE_TEAM, AddTeamPlayer, ADD_TEAM_PLAYER, RemoveTeamPlayer, REMOVE_TEAM_PLAYER } from '../store/user-team.reducer';
import { Observable } from 'rxjs';
import { map, take, tap, share } from 'rxjs/operators';
import { RemoveFreeAgent, REMOVE_FREE_AGENT, AddFreeAgent, ADD_FREE_AGENT } from '../store/free-agents.reducer';
import { Pick } from './pick/pick.service';
import { Division } from '../../typings';

export interface Team {
  id_sl: number;
  default_team: boolean;
  team: {
    id_sl: number;
    slug: string;
    city: string;
    nickname: string;
    division: Division;
    users: User[];
    picks: Pick[];
    players: Player[];
    record: {
      win: number;
      loss: number;
    };
    stats: {
      minutes_pg: number;
      minutes_sg: number;
      minutes_sf: number;
      minutes_pf: number;
      minutes_c: number;
      fantasy_points: number;
    };
    recent_games: Game[];
    next_games: Game[];
  };
}

export interface TeamPlayer {
  id_player: number;
  id_sl: number;
  order: number;
  primary_position: string;
  secondary_position: string;
}

interface TeamState {
  team: Team;
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private resource = 'teams';
  private userTeam: Observable<Team>;

  getDefaultTeam(teams: Team[]) {
    return teams.find(team => team.default_team);
  }

  isTeamDefined(): boolean {
    let userTeam;
    this.userTeam.subscribe(team => userTeam = team);
    return userTeam !== undefined;
  }

  getTeamRoster(id: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/roster`;
    return this.http.get<Team>(url);
  }

  getTeam(id: number, useCache?: boolean): Observable<Team> {
    if (useCache && this.isTeamDefined()) {
      return this.userTeam;
    }

    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}`;
    const res = this.http.get<Team>(url).pipe(share());
    if (useCache) {
      res.subscribe(payload => this.store.dispatch({ type: UPDATE_TEAM, payload }));
      return this.userTeam;
    }

    return res;
  }

  getTeamGames(id: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/games`;
    return this.http.get<{ team: { all_games: Game[]}}>(url).pipe(map(res => res.team.all_games));
  }

  removePlayer(teamId: number, player: Player) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${teamId}/roster/${player.id_player}`;
    const res = this.http.delete<{dumpPlayer: number}>(url);

    res.subscribe(response => {
      if (response.dumpPlayer) {
        this.store.dispatch<RemoveTeamPlayer>({type: REMOVE_TEAM_PLAYER, payload: {id: player.id_player}});

        const freeAgent = {
          ...player,
          default_primary: player.team_info.primary_position,
          default_secondary: player.team_info.secondary_position,
        };

        this.store.dispatch<AddFreeAgent>({type: ADD_FREE_AGENT, payload: freeAgent});
      }
    });

    return res;
  }

  swapPosition(teamId: number, playerId: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${teamId}/roster/${playerId}`;
    return this.http.post(url, {teamId, playerId});
  }

  saveRoster(teamId: number, roster: TeamPlayer[]) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${teamId}/roster`;
    return this.http.post(url, {teamId, roster});
  }

  getTrades(teamId: number): Observable<TeamTrades> {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${teamId}/trade`;
    return this.http.get<TeamTrades>(url);
  }

  getRosterStats(teamId: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${teamId}/roster/stats`;
    return this.http.get<Team>(url);
  }

  addPlayer(id: number, player: Player) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/player`;

    const body = {
      team_info: {
        id_player: player.id_player,
        id_sl: id,
        primary_position: player.default_primary,
        secondary_position: player.default_secondary,
      }
    };

    const res = this.http.post<{ recruitPlayer: { id_player: number } }>(url, body);

    res.subscribe(response => {
      if (response.recruitPlayer.id_player) {
        const teamPlayer: Player = {
          ...player,
          team_info: {
            primary_position: body.team_info.primary_position,
            secondary_position: body.team_info.secondary_position,
            order: 999,
          },
        };
        this.store.dispatch<AddTeamPlayer>({ type: ADD_TEAM_PLAYER, payload: teamPlayer });
        this.store.dispatch<RemoveFreeAgent>({ type: REMOVE_FREE_AGENT, payload: player });
      }
    });

    return res;
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    protected http: HttpClient,
    private store: Store<TeamState>
  ) {
    this.userTeam = store.pipe(select('userTeam'));
  }
}
