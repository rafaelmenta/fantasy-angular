import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { BaseAdminNBATeam, AdminRound, AdminSeason } from './system';
import { map, share } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  private nbaTeamsSubject = new ReplaySubject<BaseAdminNBATeam[]>(1);
  nbaTeams$ = this.nbaTeamsSubject.asObservable();

  private roundsSubject = new ReplaySubject<AdminRound[]>(1);
  rounds$ = this.roundsSubject.asObservable();

  private seasonsSubject = new ReplaySubject<AdminSeason[]>(1);
  seasons$ = this.seasonsSubject.asObservable();

  private getNBATeams() {
    const url = `${this.config.API_ENDPOINT}nba/teams`;
    return this.http.get<{ teams_nba: BaseAdminNBATeam[] }>(url).pipe(
      map(res => res.teams_nba),
      share()
    );
  }

  private getSeasonRounds() {
    const url = `${this.config.API_ENDPOINT}rounds`;
    return this.http.get<{ rounds: AdminRound[] }>(url).pipe(
      map(res => res.rounds),
      share()
    );
  }

  private getSeasons() {
    const url = `${this.config.API_ENDPOINT}system/seasons`;
    return this.http.get<{ available_seasons: AdminSeason[] }>(url).pipe(
      map(res => res.available_seasons),
      share()
    );
  }

  getSlugCount(slug: string) {
    const url = `${this.config.API_ENDPOINT}system/slug/${slug}`;
    return this.http.get<{ slug_count: number }>(url).pipe(
      map(res => res.slug_count),
      share()
    );
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    this.getNBATeams().subscribe(teams => this.nbaTeamsSubject.next(teams));
    this.getSeasonRounds().subscribe(rounds => this.roundsSubject.next(rounds));
    this.getSeasons().subscribe(seasons => this.seasonsSubject.next(seasons));
  }
}
