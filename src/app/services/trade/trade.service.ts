import { Injectable, Inject } from '@angular/core';
import { Pick } from '../pick/pick.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AddSentTrade,
  RemoveReceivedTrade,
  RemoveSentTrade,
  ADD_SENT_TRADE,
  REMOVE_SENT_TRADE,
  REMOVE_RECEIVED_TRADE,
} from '../../store/trade.reducer';
import { Team } from '../team.service';
import { share } from 'rxjs/operators';

export interface TradePlayer {
  id_player: number;
  first_name: string;
  last_name: string;
  player_slug: string;
  default_primary: string;
  default_secondary: string;
}

export interface TradeTeam {
  id_sl: number;
  city: string;
  nickname: string;
  slug: string;
}

export interface Trade {
  id_trade: number;
  receiver_players: TradePlayer[];
  receiver_picks: Pick[];
  sender_players: TradePlayer[];
  sender_picks: Pick[];
  trade_comment: string;
}

export interface SentTrade extends Trade {
  receiver: TradeTeam;
}

export interface ReceivedTrade extends Trade {
  sender: TradeTeam;
}

export interface TeamTrades {
  team: {
    received_trades: ReceivedTrade[];
    sent_trades: SentTrade[];
  };
}

export interface Proposal {
  sender: number;
  receiver: number;
  trading: {
    players: number[];
    picks: number[];
  };
  user: {
    players: number[];
    picks: number[];
  };
  trade_comment: string;
}

interface TradeState {
  trades: TeamTrades;
}

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private trades: Observable<TeamTrades>;
  private resource = 'trades';

  cancelTrade(idTrade, type: 'received'|'sent') {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${idTrade}`;
    const res = this.http.delete(url).pipe(share());

    res.subscribe((response: {removeTrade: number[]}) => {
      if (response.removeTrade) {
        if (type === 'received') {
          this.store.dispatch<RemoveReceivedTrade>({type: REMOVE_RECEIVED_TRADE, payload: {id: idTrade}});
        } else {
          this.store.dispatch<RemoveSentTrade>({type: REMOVE_SENT_TRADE, payload: {id: idTrade}});
        }
      }
    });

    return res;
  }

  confirmTrade(idTrade: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${idTrade}`;
    const res = this.http.post<{acceptTrade: number[]}>(url, {}).pipe(share());
    return res;
  }

  createTrade(team: Team['team'], trade: SentTrade) {
    const url = `${this.config.API_ENDPOINT}${this.resource}`;

    const proposal = this.tradeToProposal(team, trade);
    const res = this.http.post(url, { trade: proposal }).pipe(share());

    res.subscribe((response: {addTrade: {id_trade: number; }}) => {
      if (response.addTrade) {
        trade.id_trade = response.addTrade.id_trade;
        this.store.dispatch<AddSentTrade>({type: ADD_SENT_TRADE, payload: {trade}});
      }
    });

    return res;
  }

  private tradeToProposal(team: Team['team'], trade: SentTrade): Proposal {
    return {
      trade_comment: trade.trade_comment,
      sender: team.id_sl,
      receiver: trade.receiver.id_sl,
      trading: {
        players: trade.receiver_players.map(player => player.id_player),
        picks: trade.receiver_picks.map(pick => pick.id_pick),
      },
      user: {
        players: trade.sender_players.map(player => player.id_player),
        picks: trade.sender_picks.map(pick => pick.id_pick),
      },
    };
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private store: Store<TradeState>,
    protected http: HttpClient) {
      this.trades = store.pipe(select('trades'));
  }
}