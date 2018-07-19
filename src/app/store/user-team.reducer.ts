import { Action } from '@ngrx/store';
import { Team } from '../services/team.service';
import { Player } from '../services/player/player.service';
import { Pick } from '../services/pick/pick.service';

export const UPDATE_TEAM = 'UPDATE_TEAM';
export const ADD_TEAM_PICK = 'ADD_TEAM_PICK';
export const ADD_TEAM_PLAYER = 'ADD_TEAM_PLAYER';
export const REMOVE_TEAM_PLAYER = 'REMOVE_TEAM_PLAYER';
export const REMOVE_TEAM_PICK = 'REMOVE_TEAM_PICK';
export const UPDATE_TEAM_PLAYER = 'UPDATE_TEAM_PLAYER';

export interface UpdateTeam extends Action {
  type: 'UPDATE_TEAM';
  payload: Team;
}

export interface AddTeamPlayer extends Action {
  type: 'ADD_TEAM_PLAYER';
  payload: Player;
}

export interface AddTeamPick extends Action {
  type: 'ADD_TEAM_PICK';
  payload: Pick;
}

export interface RemoveTeamPlayer extends Action {
  type: 'REMOVE_TEAM_PLAYER';
  payload: { id: number };
}

export interface RemoveTeamPick extends Action {
  type: 'REMOVE_TEAM_PICK';
  payload: { id: number };
}

export interface UpdateTeamPlayer extends Action {
  type: 'UPDATE_TEAM_PLAYER';
  payload: Player;
}
export type UserTeamAction = UpdateTeam | AddTeamPlayer | RemoveTeamPlayer | UpdateTeamPlayer |
 AddTeamPick | RemoveTeamPick;

export function userTeamReducer(state: Team, action: UserTeamAction) {
  switch (action.type) {
    case UPDATE_TEAM: {
      return action.payload;
    }

    case ADD_TEAM_PLAYER: {
      if (!state) {
        return state;
      }
      return {
        team_overview: {
          ...state.team_overview,
          players: state.team_overview.players.concat(action.payload),
        }
      };
    }

    case REMOVE_TEAM_PLAYER: {
      if (!state) {
        return state;
      }
      return {
        team_overview: {
          ...state.team_overview,
          players: state.team_overview.players.filter(player => player.id_player !== action.payload.id),
        },
      };
    }

    case ADD_TEAM_PICK: {
      if (!state) {
        return state;
      }

      return {
        team_overview: {
          ...state.team_overview,
          picks: state.team_overview.picks.concat(action.payload),
        }
      };
    }

    case REMOVE_TEAM_PICK: {
      if (!state) {
        return state;
      }
      return {
        team_overview: {
          ...state.team_overview,
          picks: state.team_overview.picks.filter(pick => pick.id_pick !== action.payload.id),
        },
      };
    }

    case UPDATE_TEAM_PLAYER: {
      if (!state) {
        return state;
      }
      return {
        team_overview: {
          ...state.team_overview,
          players: state.team_overview.players
            .filter(player => player.id_player !== action.payload.id_player)
            .push(action.payload),
        }
      };

    }

    default: return state;
  }
}
