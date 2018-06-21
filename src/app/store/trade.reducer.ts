import { Trade, TeamTrades, SentTrade, ReceivedTrade } from '../services/trade/trade.service';
import { Action } from '@ngrx/store';

export const UPDATE_TRADE = 'UPDATE_TRADE';
export const ADD_SENT_TRADE = 'ADD_SENT_TRADE';
export const REMOVE_SENT_TRADE = 'REMOVE_SENT_TRADE';
export const ADD_RECEIVED_TRADE = 'ADD_RECEIVED_TRADE';
export const REMOVE_RECEIVED_TRADE = 'REMOVE_RECEIVED_TRADE';

export interface UpdateTrade extends Action {
  type: 'UPDATE_TRADE';
  payload: {
    teamTrades: TeamTrades;
  };
}

export interface AddSentTrade extends Action {
  type: 'ADD_SENT_TRADE';
  payload: {
    trade: SentTrade;
  };
}

export interface RemoveSentTrade extends Action {
  type: 'REMOVE_SENT_TRADE';
  payload: {
    id: number;
  };
}

export interface AddReceivedTrade extends Action {
  type: 'ADD_RECEIVED_TRADE';
  payload: {
    trade: ReceivedTrade;
  };
}

export interface RemoveReceivedTrade extends Action {
  type: 'REMOVE_RECEIVED_TRADE';
  payload: {
    id: number;
  };
}

export type TradeActions = UpdateTrade | AddSentTrade | RemoveSentTrade | AddReceivedTrade | RemoveReceivedTrade;

export function tradeReducer(state: TeamTrades, action: TradeActions) {
  switch (action.type) {
    case UPDATE_TRADE: {
      return action.payload.teamTrades;
    }

    case ADD_SENT_TRADE: {
      return {
        team: {
          ...state.team,
          sent_trades: state.team.sent_trades.concat(action.payload.trade),
        }
      };
    }

    case REMOVE_SENT_TRADE: {
      const id = action.payload.id;
      return {
        team: {
          ...state.team,
          sent_trades: state.team.sent_trades.filter(trade => trade.id_trade !== id),
        }
      };
    }

    case REMOVE_RECEIVED_TRADE: {
      const id = action.payload.id;
      return {
        team: {
          ...state.team,
          received_trades: state.team.received_trades.filter(trade => trade.id_trade !== id),
        }
      };
    }

    default: return state;
  }
}
