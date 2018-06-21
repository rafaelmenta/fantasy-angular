import { Injectable, Inject } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';

export interface RoundStat {
  round: {round_number: number};
  fantasy_points: number;
  max_fantasy_points: number;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  resource = 'stats';

  getRoundAverages() {
    const url = `${this.config.API_ENDPOINT}${this.resource}/round_averages`;
    return this.http.get<{ round_averages: RoundStat[] }>(url).pipe(map(res => res.round_averages)).pipe(share());
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    protected http: HttpClient) { }
}
