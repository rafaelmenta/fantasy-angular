import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../../app.config';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { AdminDraft, AdminDraftInput, BaseAdminDraft, AdminPick } from './admin-draft';
import { ReplaySubject } from 'rxjs';

export enum AdminDraftStatus {
  STATUS_CLOSED = '0',
  STATUS_OPEN = '1',
  STATUS_FINISHED = '2',
}

export enum AdminDraftType {
  GENERAL = 1,
  ROOKIES = 2,
}

@Injectable({
  providedIn: 'root'
})
export class AdminDraftService {

  getDraft(id: number) {
    const url = `${this.config.API_ENDPOINT}draft/${id}`;
    return this.http.get<{ draft_overview: AdminDraft }>(url).pipe(
      map(res => res.draft_overview),
      share());
  }

  createDraft(draft: AdminDraftInput) {
    const url = `${this.config.API_ENDPOINT}draft`;
    return this.http.post<{ createDraft: {id_draft: number} }>(url, draft).pipe(
      map(res => res.createDraft),
      share());
  }

  removeDraft(draft: BaseAdminDraft) {
    const url = `${this.config.API_ENDPOINT}draft/${draft.id_draft}`;
    return this.http.delete<{ deleteDraft: number }>(url).pipe(share());
  }

  updateDraft(draft: BaseAdminDraft) {
    const url = `${this.config.API_ENDPOINT}draft/${draft.id_draft}`;
    return this.http.post<{ updateDraftStatus: number[] }>(url, draft).pipe(share());
  }

  createRound(draft: AdminDraft, round: number) {
    const url = `${this.config.API_ENDPOINT}draft/${draft.id_draft}/round`;
    return this.http.post<{ createRound: AdminPick[] }>(url, {id_league: draft.id_league, round}).pipe(share());
  }

  deleteRound(draft: AdminDraft, round: number) {
    const url = `${this.config.API_ENDPOINT}draft/${draft.id_draft}/round/${round}`;
    return this.http.delete<{ deleteRound: number }>(url).pipe(share());
  }

  savePick(pick: AdminPick) {
    const url = `${this.config.API_ENDPOINT}draft/pick`;
    return this.http.post<{ savePick: number[] }>(url, pick).pipe(share());
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) { }
}
