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