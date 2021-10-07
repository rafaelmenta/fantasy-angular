import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { TeamNba, GameNba } from '../nba.service';

export interface PlayerStat {
  minutes: number;
  fantasy_points: number;
}

export interface Player {
  id_player: number;
  first_name: string;
  last_name: string;
  player_slug: string;
  default_primary?: string;
  default_secondary?: string;
  birthdate: string;
  team_info: {
    primary_position: string;
    secondary_position: string;
    order: number;
  };
  stats: PlayerStat[];
  salary: {
    contract_salary: number;
    contract_years: number;
  };
  team_nba: TeamNba;
  rookie?: boolean;
}

export interface PlayerNextGame {
  id_player: number;
  first_name: string;
  last_name: string;
  player_slug: string;
  next_games: GameNba[];
}

export interface PlayerRoundPerformance {
  assists: number;
  blocks: number;
  defensive_rebounds: number;
  fantasy_points: number;
  field_goal_attempts: number;
  free_throw_attempts: number;
  minutes: number;
  offensive_rebounds: number;
  personal_fouls: number;
  points: number;
  steals: number;
  turnovers: number;
  round: {
    id_round: number;
    round_number: number;
  };
}

export interface PlayerPerformances {
  player_slug: string;
  first_name: string;
  last_name: string;
  performances: PlayerRoundPerformance[];
}

export interface StatPlayer {
  games: number;
  minutes: number;
  field_goal_attempts: number;
  free_throw_attempts: number;
  points: number;
  defensive_rebounds: number;
  offensive_rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  personal_fouls: number;
  fantasy_points: number;
  player: Player;
}

export interface PlayerLookup {
  id_player: number;
  player_slug: string;
  first_name: string;
  last_name: string;
  default_primary: string;
  default_secondary: string;
  id_nba?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private resource = 'players';

  getPlayer(id: string) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}`;
    return this.http.get<{player: Player}>(url).pipe(map(res => res.player)).pipe(share());
  }

  getNextGames(id: string) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/nextgames`;
    return this.http.get<{player: PlayerNextGame}>(url).pipe(map(res => res.player)).pipe(share());
  }

  getPerformances(id: string) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/performances`;
    return this.http.get<{player: PlayerPerformances}>(url).pipe(map(res => res.player)).pipe(share());
  }

  getPlayerStats() {
    const url = `${this.config.API_ENDPOINT}${this.resource}/stats`;
    return this.http.get<{ season_averages: StatPlayer[] }>(url).pipe(map(res => res.season_averages)).pipe(share());
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    protected http: HttpClient) { }
}
