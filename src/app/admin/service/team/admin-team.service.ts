import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { share, map } from 'rxjs/operators';
import { AdminTeam, AdminTeamInfo } from './admin-team';

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

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) { }
}
