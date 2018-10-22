import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { BaseAdminNBATeam, AdminRound, AdminSeason, AdminGameNBA,
  AdminGameNBAInput, AdminGamePerformance, AdminPlayerPerformance } from './system';
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

  getNbaGames(active?: boolean) {
    const url = `${this.config.API_ENDPOINT}nba/games/current${active ? '?active=true' : ''}`;
    return this.http.get<{ current_games_nba?: AdminGameNBA[], active_games_nba?: AdminGameNBA[] }>(url).pipe(
      map(res => active ? res.active_games_nba : res.current_games_nba),
      share()
    );
  }

  addNbaGame(game: AdminGameNBAInput) {
    const url = `${this.config.API_ENDPOINT}nba/games`;
    return this.http.post<{ addNbaGame: number }>(url, game).pipe(share());
  }

  deleteNbaGame(id: number) {
    const url = `${this.config.API_ENDPOINT}nba/${id}`;
    return this.http.delete<{ deleteNbaGame: number }>(url).pipe(share());
  }

  getGamePerformance(id: string) {
    const url = `${this.config.API_ENDPOINT}nba/game/${id}`;
    return this.http.get<{ game_performance: AdminGamePerformance }>(url).pipe(
      map(res => res.game_performance),
      share());
  }

  savePlayerPerformances(rounds: number[], performances: AdminPlayerPerformance[]) {
    const url = `${this.config.API_ENDPOINT}nba/game`;
    return this.http.post<{ saveNbaPerformances: number[][] }>(url, {rounds, performances}).pipe(share());
  }

  openRound(round: AdminRound) {
    const url = `${this.config.API_ENDPOINT}rounds/${round.id_round}/open`;
    return this.http.post<{ openRound: boolean }>(url, {}).pipe(share());
  }

  closeRound(round: AdminRound) {
    const url = `${this.config.API_ENDPOINT}rounds/${round.id_round}/close`;
    return this.http.post<{ closeRound: boolean }>(url, {}).pipe(share());
  }

  syncBoxscore(game: AdminGameNBA) {
    const url = `${this.config.API_ENDPOINT}nba/game/${game.id_game_nba}/parse/${game.external_id}`;
    return this.http.post<{ saveNbaPerformances: number[][]}>(url, {}).pipe(share());
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
