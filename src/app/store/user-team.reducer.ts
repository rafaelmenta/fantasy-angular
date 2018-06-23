import { Action } from '@ngrx/store';
import { Team } from '../services/team.service';
import { Player } from '../services/player/player.service';

export const UPDATE_TEAM = 'UPDATE_TEAM';
export const ADD_TEAM_PLAYER = 'ADD_TEAM_PLAYER';
export const REMOVE_TEAM_PLAYER = 'REMOVE_TEAM_PLAYER';
export const UPDATE_TEAM_PLAYER = 'UPDATE_TEAM_PLAYER';

export interface UpdateTeam extends Action {
  type: 'UPDATE_TEAM';
  payload: Team;
}

export interface AddTeamPlayer extends Action {
  type: 'ADD_TEAM_PLAYER';
  payload: Player;
}

export interface RemoveTeamPlayer extends Action {
  type: 'REMOVE_TEAM_PLAYER';
  payload: { id: number };
}

export interface UpdateTeamPlayer extends Action {
  type: 'UPDATE_TEAM_PLAYER';
  payload: Player;
}
export type UserTeamAction = UpdateTeam | AddTeamPlayer | RemoveTeamPlayer | UpdateTeamPlayer;

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
        team: {
          ...state.team,
          players: state.team.players.concat(action.payload),
        }
      };
    }

    case REMOVE_TEAM_PLAYER: {
      if (!state) {
        return state;
      }
      return {
        team: {
          ...state.team,
          players: state.team.players.filter(player => player.id_player !== action.payload.id),
        },
      };
    }

    case UPDATE_TEAM_PLAYER: {
      if (!state) {
        return state;
      }
      return {
        team: {
          ...state.team,
          players: state.team.players
            .filter(player => player.id_player !== action.payload.id_player)
            .push(action.payload),
        }
      };

    }

    default: return state;
  }
}