import { Action } from '@ngrx/store';
import { League } from '../../typings';

export const UPDATE_LEAGUE = 'UPDATE_LEAGUE';

export interface UpdateLeague extends Action {
    type: 'UPDATE_LEAGUE';
    payload: League;
}

export type LeagueAction = UpdateLeague;

export function leagueReducer(state: League, action: LeagueAction) {
    switch (action.type) {
        case UPDATE_LEAGUE: {
            return action.payload;
        }

        default: return state;
    }
}
