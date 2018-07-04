import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../../app.config';
import { map, share } from 'rxjs/operators';

export interface TeamStatHistory {
  id_sl: number;
  id_league: number;
  id_season: number;
  name: string;
  season: string;
  win: number;
  loss: number;
  fantasy_points: number;
}

export interface ArchiveTeamStat {
  regular: TeamStatHistory[];
  playoffs: TeamStatHistory[];
}

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {

  getTeamStatHistory(id: string|number) {
    const url = `${this.config.API_ENDPOINT}teams/${id}/history`;
    return this.http.get<{archive_team_stats: TeamStatHistory[], archive_team_playoffs_stats: TeamStatHistory[]}>(url).pipe(
      map(res => ({regular: res.archive_team_stats, playoffs: res.archive_team_playoffs_stats} as ArchiveTeamStat)),
      share()
    );
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    protected http: HttpClient) { }
}
