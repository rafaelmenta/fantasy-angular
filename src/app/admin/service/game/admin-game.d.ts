import { AdminTeam } from "../team/admin-team";
import { AdminGameType } from "./admin-game.service";

export interface AdminGame {
  id_game: number;
  id_type: AdminGameType;
  id_round?: number;
  round: { round_number: number; }
  home_team: AdminTeam;
  away_team: AdminTeam;
}