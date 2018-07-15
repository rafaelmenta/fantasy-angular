import { Conference } from "../../../../typings";

export interface AdminLeague {
  id_league: number;
  name: string;
  symbol: string;
  owner: {nickname: string;};
  number_of_teams: number;
  configs: AdminLeagueConfig[];
}

export interface AdminLeagueConfig {
  id_config: string;
  config_value: string|boolean;
}

export interface AdminLeagueInfo extends AdminLeague {
  conferences: Conference[];
}

export interface AdminDivision {
  id_division: number;
  name: string;
  symbol: string;
}