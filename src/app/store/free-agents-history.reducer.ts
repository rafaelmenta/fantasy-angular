import { Action } from '@ngrx/store';
import { FreeAgencyHistory } from '../../typings';

export const UPDATE_FREE_AGENCY_HISTORY = 'UPDATE_FREE_AGENCY_HISTORY';
export const ADD_FREE_AGENCY_HISTORY = 'ADD_FREE_AGENCY_HISTORY';

export interface UpdateFreeAgencyHistory extends Action {
  type: 'UPDATE_FREE_AGENCY_HISTORY';
  payload: FreeAgencyHistory[];
}

export interface AddFreeAgencyHistory extends Action {
  type: 'ADD_FREE_AGENCY_HISTORY';
  payload: FreeAgencyHistory;
}

export type FreeAgencyHistoryActions = UpdateFreeAgencyHistory|AddFreeAgencyHistory;

export function freeAgencyHistoryReducer(state: FreeAgencyHistory[], action: FreeAgencyHistoryActions) {
  switch (action.type) {

    case UPDATE_FREE_AGENCY_HISTORY: {
      if (!action.payload) {
        return action.payload;
      }
      return [
          ...action.payload,
      ];
    }

    case ADD_FREE_AGENCY_HISTORY: {
      if (!state) {
        return state;
      }
      return [
        ...state,
        action.payload
      ];
    }

    default: return state;
  }
}
