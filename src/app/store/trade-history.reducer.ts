import { Action } from '@ngrx/store';
import { Trade } from '../services/trade/trade.service';

export const UPDATE_TRADE_HISTORY = 'UPDATE_TRADE_HISTORY';
export const ADD_TRADE_HISTORY = 'ADD_TRADE_HISTORY';

export interface UpdateTradeHistory extends Action {
  type: 'UPDATE_TRADE_HISTORY';
  payload: Trade[];
}

export interface AddTradeHistory extends Action {
  type: 'ADD_TRADE_HISTORY';
  payload: Trade;
}

export type TradeHistoryActions = UpdateTradeHistory|AddTradeHistory;

export function tradeHistoryReducer(state: Trade[], action: TradeHistoryActions) {
  switch (action.type) {

    case UPDATE_TRADE_HISTORY: {
      if (!action.payload) {
        return action.payload;
      }
      return [
          ...action.payload,
      ];
    }

    case ADD_TRADE_HISTORY: {
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
