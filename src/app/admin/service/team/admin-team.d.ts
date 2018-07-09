import { AdminTeamPlayer } from "../player/admin-player";

export interface AdminTeam {
  id_sl: number;
  city: string;
  nickname: string;
}

export interface AdminTeamInfo extends AdminTeam {
  slug: string;
  players: AdminTeamPlayer[];
  division: {
    conference: {
      league: {
        id_league: number;
      }
    }
  }
}