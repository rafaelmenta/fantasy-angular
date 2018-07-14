import { Moment } from 'moment';

export interface BaseAdminNBATeam {
  id_nba: number;
  city: string;
  nickname: string;
}

export interface AdminRound {
  id_round: number;
  open_date: string;
  close_data: string;
  round_number: number;
}

export interface AdminSeason {
  id_season: number;
  year: string;
}

export interface AdminGameNBA {
  id_game_nba: number;
  game_time: string;
  gametime?: Moment;
  date?: string;
  time?: string;
  is_finished: boolean;
  external_id: string;
  round_home: AdminRound;
  round_away: AdminRound;
  home: BaseAdminNBATeam;
  away: BaseAdminNBATeam;
}

export interface AdminGameNBAInput {
  game_time: string;
  date?: string;
  time?: string;
  gametime?: Moment;
  id_round_home: number;
  id_round_away: number;
  id_home: number;
  id_away: number;
}