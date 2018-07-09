import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { BasePlayer, AdminPlayer } from './admin-player';
import { map, share } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPlayerService {

  private playersSubject = new ReplaySubject<BasePlayer[]>(1);
  players$ = this.playersSubject.asObservable();

  private getPlayers() {
    const url = `${this.config.API_ENDPOINT}players`;
    return this.http.get<{ players: BasePlayer[] }>(url).pipe(
      map(res => res.players),
      share()
    );
  }

  getPlayer(id: string) {
    const url = `${this.config.API_ENDPOINT}players/${id}`;
    return this.http.get<{ player: AdminPlayer }>(url).pipe(
      map(res => res.player),
      share()
    );
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    this.getPlayers().subscribe(players => this.playersSubject.next(players));
  }
}
