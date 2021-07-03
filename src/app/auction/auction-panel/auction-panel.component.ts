import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Auction, PlayerBid, PlayerBidHistory } from 'src/app/services/auction/auction.service';
import { PlayerLookup } from 'src/app/services/player/player.service';
import { SalaryCap } from 'src/app/services/team.service';
import { compare } from 'src/lib/utils';

@Component({
  selector: 'app-auction-panel',
  templateUrl: './auction-panel.component.html',
  styleUrls: ['./auction-panel.component.css']
})
export class AuctionPanelComponent implements OnChanges {

  @Input() auction: Auction;
  @Input() bids: PlayerBid[];
  @Input() cap: SalaryCap;

  currentBids: PlayerBid[];

  @Output() refresh = new EventEmitter();
  @Output() playerBid: EventEmitter<PlayerBid> = new EventEmitter();
  toggleHistoryValue: number | boolean;
  toggleFormValue: number | boolean;

  constructor() { }

  getBidClass(bid: PlayerBid) {
    const {expiration} = bid;
    const now = new Date();

    const diff = expiration as any - (now as any);

    if (diff <= 0) { return 'finished'; }
    if (diff <= 60 * 60 * 1000) { return 'last-hour'; }
    if (diff <= 6 * 60 * 60 * 1000) { return 'last-six'; }

    return 'open';
  }

  isExpired(bid: PlayerBid) {
    const {expiration} = bid;
    const now = new Date();
    const diff = expiration as any - (now as any);

    return diff <= 0;
  }

  sendBid(playerBid: PlayerBid, bid: { salary: number, years: number }) {
    const updatedBid: PlayerBid = {
      ...playerBid,
      ...bid,
    };

    this.playerBid.emit(updatedBid);
  }

  ngOnChanges(changes) {
    const newBids = changes.bids;

    if (!newBids) { return; }

    if (newBids.firstChange) {
      this.currentBids = newBids.currentValue;
      this.currentBids.sort((a, b) => compare(a.expiration, b.expiration, true));
    } else {
      if (!this.compareBidList(newBids.currentValue, this.currentBids)) {
        newBids.currentValue.sort((a, b) => compare(a.expiration, b.expiration, true));
        this.currentBids = newBids.currentValue;
      }
    }
  }

  sortedHistory(history: PlayerBidHistory[]) {
    if (!history) { return []; }
    return history.sort((a, b) => compare(a.bid_time, b.bid_time, false));
  }

  private compareBidList (a: PlayerBid[], b: PlayerBid[]) {
    if (a.length !== b.length) { return false; }

    for (const bid of a) {
      const found = b.find(({id_bid, player, salary, years, team, history}) => {
        return id_bid === bid.id_bid &&
          (history && history.length) === (bid.history && bid.history.length) &&
          player.id_player === bid.player.id_player &&
          team.id_sl === bid.team.id_sl &&
          salary === bid.salary &&
          years === bid.years;
      });
      if (!found) {
        return false;
      }
    }

    return true;
  }

  addBid(bid: PlayerBid) {
    this.currentBids.push(bid);
  }

  refreshData() {
    this.refresh.emit();
  }

  toggleHistory(bid: PlayerBid) {
    if (this.toggleHistoryValue === bid.id_bid) {
      this.toggleHistoryValue = false;
    } else {
      this.toggleHistoryValue = bid.id_bid;
    }

    this.toggleFormValue = false;
  }

  toggleForm(bid: PlayerBid) {
    if (this.toggleFormValue === bid.id_bid) {
      this.toggleFormValue = false;
    } else {
      this.toggleFormValue = bid.id_bid;
    }

    this.toggleHistoryValue = false;
  }

}
