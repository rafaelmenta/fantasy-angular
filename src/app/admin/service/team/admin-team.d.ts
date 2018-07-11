import { AdminTeamPlayer } from "../player/admin-player";
import { AdminUser } from "../user/admin-user";

export interface AdminTeam {
  id_sl: number;
  city: string;
  nickname: string;
}

export interface AdminTeamInfo extends AdminTeam {
  slug: string;
  players: AdminTeamPlayer[];
  users: AdminUser[];
  division: {
    id_division: number;
    conference: {
      league: {
        id_league: number;
      }
    }
  }
}

export interface AdminTeamInfoInput extends AdminTeam {
  id_division: number;
  id_user: number;
  slug: string;
}