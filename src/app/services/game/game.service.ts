import { Injectable, Inject } from '@angular/core';
import { Team } from '../team.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';

export enum GameType {
  OFFICIAL = 1,
}

export interface Game {
  id_game: number;
  round: {
    round_number: number;
  };
  home_team: Team;
  home_performance: {
    fantasy_points: number;
  };
  away_team: Team;
  away_performance: {
    fantasy_points: number;
  };
}

export interface BoxscoreTeam {
  id_sl: number;
  city: string;
  nickname: string;
  slug: string;
  symbol: string;
  primary_color: string;
}

export interface BoxscoreTeamPerformance {
  fantasy_points: number;
  minutes_c: number;
  minutes_pf: number;
  minutes_sf: number;
  minutes_sg: number;
  minutes_pg: number;
}

interface BoxscorePlayerInfo {
  id_player: number;
  first_name: string;
  last_name: string;
  player_slug: string;
}

interface BoxscorePlayerPerformance {
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
  win_loss: number;
}

export interface BoxscorePlayer {
  id_player: number;
  order: number;
  fantasy_points: number;
  minutes_primary: number;
  minutes_secondary: number;
  primary_position: string;
  secondary_position: string;
  player: BoxscorePlayerInfo;
  performance: BoxscorePlayerPerformance;
}

export interface GamePerformance {
  id_game: number;
  id_round: number;
  id_type: GameType;
  home_team: BoxscoreTeam;
  home_performance: BoxscoreTeamPerformance;
  home_players: BoxscorePlayer[];
  away_team: BoxscoreTeam;
  away_performance: BoxscoreTeamPerformance;
  away_players: BoxscorePlayer[];
  round: {
    round_number: number;
    open_date: string;
    close_data: string;
  };

}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private resource = 'games';

  getBoxscore(id: string) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}`;
    return this.http.get<{ game: Game }>(url).pipe(map(res => res.game)).pipe(share());
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    protected http: HttpClient) { }
}
