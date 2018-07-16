import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { AdminLeague, AdminLeagueInfo, AdminDivision, AdminLeagueConfig } from './admin-league';
import { share, map, tap } from 'rxjs/operators';
import { AdminFreeAgent } from '../player/admin-player';
import { League, Conference } from '../../../../typings';
import { BaseAdminDraft } from '../draft/admin-draft';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLeagueService {

  private leagueDraftsSubject = new ReplaySubject<BaseAdminDraft[]>(1);
  private leagueDraft$ = this.leagueDraftsSubject.asObservable();

  getLeagues() {
    const url = `${this.config.API_ENDPOINT}leagues`;
    return this.http.get<{leagues: AdminLeague[]}>(url).pipe(
      map(res => res.leagues),
      share()
    );
  }

  getLeague(id: number) {
    const url = `${this.config.API_ENDPOINT}leagues/${id}`;
    return this.http.get<{league: AdminLeagueInfo}>(url).pipe(
      map(res => res.league),
      share()
    );
  }

  getLeagueDivisions(id: number) {
    const url = `${this.config.API_ENDPOINT}leagues/${id}/divisions`;
    return this.http.get<{league_divisions: AdminDivision[]}>(url).pipe(
      map(res => res.league_divisions),
      share()
    );
  }

  getLeagueFreeAgents(id: number) {
    const url = `${this.config.API_ENDPOINT}leagues/${id}/free-agents`;
    return this.http.get<{league: {free_agents: AdminFreeAgent[]} }>(url).pipe(
      map(res => res.league.free_agents),
      share()
    );
  }

  getLeagueTeams(leagueId: number) {
    const url = `${this.config.API_ENDPOINT}leagues/${leagueId}/teams`;
    return this.http.get<{ league_overview: League }>(url).pipe(map(res => res.league_overview));
  }

  getLeagueDrafts(leagueId: number) {
    const url = `${this.config.API_ENDPOINT}leagues/${leagueId}/drafts`;

    this.http.get<{ league: { next_drafts: BaseAdminDraft[] } }>(url).pipe(
      map(res => res.league.next_drafts),
    ).subscribe(res => this.leagueDraftsSubject.next(res));

    return this.leagueDraft$;
  }

  saveLeague(id: number, league: AdminLeague) {
    const url = `${this.config.API_ENDPOINT}leagues/${id}`;
    return this.http.post<{saveLeague: number[]}>(url, league).pipe(share());
  }

  saveConference(id: number, conference: Conference) {
    const url = `${this.config.API_ENDPOINT}leagues/${id}/conference`;
    return this.http.post<{saveConference: number[]}>(url, conference).pipe(share());
  }

  saveConfigs(id: number, configs: AdminLeagueConfig[]) {
    const url = `${this.config.API_ENDPOINT}leagues/${id}/configs`;
    return this.http.post<{ saveConfigs: number[] }>(url, { configs }).pipe(
      share()
    );
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) { }
}
