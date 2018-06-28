import { Injectable, Inject } from '@angular/core';
import { Pick } from '../pick/pick.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { PlayerLookup } from '../player/player.service';
import { map, share } from 'rxjs/operators';

export interface Draft {
  id_draft: number;
  year_draft: number;
  status_draft?: DraftStatus;
}

export enum DraftStatus {
  STATUS_CLOSED = '0',
  STATUS_OPEN = '1',
  STATUS_FINISHED = '2',
}

export enum DraftType {
  GENERAL = 1,
  ROOKIES = 2,
}

export interface DraftOverview {
  id_draft: number;
  id_league: number;
  year_draft: number;
  status_draft: DraftStatus;
  season: { year: number; };
  picks: Pick[];
}

interface DraftPickBody {
  id_league: number;
  id_pick: number;
  id_player: number;
  id_sl: number;
}

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  resource = 'draft';

  getAvailablePlayers(id: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/available-players`;
    return this.http.get<{draft: {available_players: PlayerLookup[]}}>(url).pipe(
      map(res => res.draft.available_players),
      share(),
    );
  }

  getDraftOverview(id: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}`;
    return this.http.get<{ draft_overview: DraftOverview }>(url).pipe(
      map(res => res.draft_overview),
      share());
  }

  draftPlayer(id: number, body: DraftPickBody) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/draft-player`;
    return this.http.post<{draftPlayer: {id_player: number}}>(url, body).pipe(share());
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    protected http: HttpClient,
  ) { }
}
