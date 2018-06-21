import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { format } from 'date-fns';

export interface TeamNba {
  id_nba: number;
  city: string;
  nickname: string;
  slug: string;
  symbol: string;
}

export interface GameNba {
  id_game_nba: number;
  game_time: string;
  home_team: TeamNba;
  away_team: TeamNba;
  round_home: { round_number: number };
  round_away: { round_number: number };


}

@Injectable({
  providedIn: 'root'
})
export class NbaService {

  private resource = 'nba';

  getGames(startDate: Date, endDate: Date) {
    const start = format(startDate, 'YYYY-MM-DD');
    const end = format(endDate, 'YYYY-MM-DD');
    const url = `${this.config.API_ENDPOINT}${this.resource}/games?start="${start}"&end="${end}"`;
    return this.http
      .get<{ranged_date_games_nba: GameNba[] }>(url)
      .pipe(map(res => res.ranged_date_games_nba)).pipe(share());
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    protected http: HttpClient) { }
}
