import { Injectable } from '@angular/core';
import { Draft } from '../draft/draft.service';
import { Team } from '../team.service';
import { PlayerLookup } from '../player/player.service';

export interface Pick {
  id_pick: number;
  round: number;
  order: number;
  deadline: string;
  is_used: boolean;
  original: {
    id_sl: number;
    city: string;
    nickname: string;
    slug: string;
    symbol: string;
  };
  owner: {
    id_sl: number;
    city: string;
    nickname: string;
    slug: string;
    symbol: string;
  };
  player: PlayerLookup;
}

@Injectable({
  providedIn: 'root'
})
export class PickService {

  constructor() { }
}
