import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, of, throwError } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { AdminLeagueConfig } from 'src/app/admin/service/league/admin-league';
import { AppConfig, APP_CONFIG } from 'src/app/app.config';
import { isArray } from 'util';
import { PlayerLookup } from '../player/player.service';
import { TeamLookup } from '../team.service';

export interface Auction {
  id_auction: number;
  status: AuctionStatus;
  date_started: Date;
  date_ended: Date;
}

export interface PlayerBid {
  id_bid: number;
  id_auction: number;
  salary: number;
  years: number;
  player: PlayerLookup;
  team: TeamLookup;
  expiration: Date;
  history: PlayerBidHistory[];
}

export interface PlayerBidHistory {
  id_bid_history: number;
  id_bid: number;
  salary: number;
  years: number;
  player: PlayerLookup;
  team: TeamLookup;
  bid_time: Date;
}

export enum AuctionStatus {
  CLOSED = 0,
  OPEN = 1,
}

interface ErrorResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  private resource = 'auctions';

  getAuctionPlayers(id: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/players`;
    return this.http.get<{ auction: { bids: PlayerBid[], league: { free_agents: PlayerLookup[] }} }>(url).pipe(
      map(res => ({bids: res.auction.bids, free_agents: res.auction.league.free_agents })),
      share());
  }

  getAuctionRules(id: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/rules`;
    return this.http.get<{ rules: AdminLeagueConfig[] }>(url).pipe(
      map(res => res.rules),
      share());
  }

  sendBid(bid: PlayerBid) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/bid`;

    const body = {
      id_bid: bid.id_bid,
      id_auction: bid.id_auction,
      id_player: bid.player.id_player,
      id_sl: bid.team.id_sl,
      salary: bid.salary,
      years: bid.years,
    };

    const now = Date.now();
    bid.expiration = new Date(now + (72 * 60 * 60 * 1000));

    return this.http.post<{saveBid: {id_bid: number, expiration: Date} | ErrorResponse[]}>(url, body).pipe(
      map(data => {

        if (isArray(data)) {
          const error: ErrorResponse = data[0];
          throw (error.message);
        }

        return {...bid, ...data.saveBid} as PlayerBid;
      }),
      share(),
    );
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    protected http: HttpClient,
  ) { }
}
