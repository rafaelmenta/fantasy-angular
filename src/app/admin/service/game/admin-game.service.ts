import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { AdminGame } from './admin-game';
import { map, share, tap } from 'rxjs/operators';
import { Subject, ReplaySubject } from 'rxjs';

export enum AdminGameType {
  LEAGUE = 1,
  PLAYOFF = 2,
  FRIENDLY = 3,
}

@Injectable({
  providedIn: 'root'
})
export class AdminGameService {

  private gamesSubject = new ReplaySubject<AdminGame[]>(1);
  private games$ = this.gamesSubject.asObservable();

  loadLeagueGames(id: number) {
    const url = `${this.config.API_ENDPOINT}leagues/${id}/games`;
    return this.http.get<{ league_games: AdminGame[] }>(url).pipe(
      map(res => res.league_games),
      share()
    );
  }

  getLeagueGames(id: number) {
    this.loadLeagueGames(id).subscribe(res => this.gamesSubject.next(res));
    return this.games$;
  }

  createGame(game: AdminGame) {
    const url = `${this.config.API_ENDPOINT}games/`;
    return this.http.post<{ createGame: number[] }>(url, game).pipe(share());
  }

  deleteGame(id: number) {
    const url = `${this.config.API_ENDPOINT}games/${id}`;
    return this.http.delete<{deleteGame: number}>(url).pipe(share());
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) { }
}
