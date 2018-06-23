import { Player } from '../services/player/player.service';
import { Action } from '@ngrx/store';


export const UPDATE_FREE_AGENTS = 'UPDATE_FREE_AGENTS';
export const ADD_FREE_AGENT = 'ADD_FREE_AGENT';
export const REMOVE_FREE_AGENT = 'REMOVE_FREE_AGENT';

export interface UpdateFreeAgents extends Action {
    type: 'UPDATE_FREE_AGENTS';
    payload: Player[];
}

export interface AddFreeAgent extends Action {
    type: 'ADD_FREE_AGENT';
    payload: Player;
}

export interface RemoveFreeAgent extends Action {
    type: 'REMOVE_FREE_AGENT';
    payload: Player;
}

export type FreeAgentAction = UpdateFreeAgents|AddFreeAgent|RemoveFreeAgent;

export function freeAgentsReducer(state: Player[], action: FreeAgentAction) {
    switch (action.type) {

        case UPDATE_FREE_AGENTS: {
            if (!action.payload) {
                return action.payload;
            }
            return [
                ...action.payload
            ];
        }
        case ADD_FREE_AGENT: {
            if (!state) {
                return state;
            }
            return [
                action.payload,
                ...state,
            ];
        }
        case REMOVE_FREE_AGENT: {
            if (!state) {
                return state;
            }
            return state.filter(player => player.id_player !== action.payload.id_player);
        }

        default: return state;
    }
}
