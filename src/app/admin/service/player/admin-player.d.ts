interface BasePlayer {
  id_player: number;
  first_name: string;
  last_name: string;
  player_slug: string;
  id_nba: number;
}

export interface AdminTeamPlayer extends BasePlayer {
  team_info: {
    primary_position: string;
    secondary_postion: string;
    order: number;
  }
}

export interface AdminFreeAgent extends BasePlayer {
  id_nba: number;
  default_primary: string;
  default_secondary: string;
}

export interface AdminPlayer extends AdminFreeAgent {
  birthdate: string;
  team_nba: {
    id_nba: number;
    city: string;
    nickname: string;
  }
  rookie: boolean;
}