import { Player } from "../app/services/player/player.service";
import { Team, TeamLookup } from "../app/services/team.service";
import { UserTeam } from "../app/services/user.service";

export type League = {
    id_league?: number;
    name?: string;
    symbol?: string;
    conferences?: Conference[];
    free_agents?: Player[];
}

export type Conference = {
    id_conference?: number;
    name?: string;
    symbol?: string;
    league: League,
    divisions?: Division[];
}
export type Division = {
    id_division?: number;
    name?: string;
    symbol?: string;
    conference: Conference,
    teams?: TeamInfo[];
}

export type TeamInfo = {
    id_sl: number;
    city: string;
    nickname: string;
    slug: string;
    symbol: string;
    record: {
        win: number;
        loss: number;
    };
    stats: {
        fantasy_points: number;
    }
}

export type FreeAgencyAction = 'PICK'|'DROP';

export type FreeAgencyHistory = {
    player: Player;
    event_date: Date;
    action: FreeAgencyAction;
    team_sl: UserTeam['team'];
}
