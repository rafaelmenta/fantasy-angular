import { Injectable } from '@angular/core';
import { Draft } from '../draft/draft.service';
import { Team } from '../team.service';

export interface Pick {
  id_pick: number;
  is_used: boolean;
  round: number;
  draft: Draft;
  original: Team['team'];
}

@Injectable({
  providedIn: 'root'
})
export class PickService {

  constructor() { }
}
