import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PlayerBid } from 'src/app/services/auction/auction.service';
import { PlayerLookup } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-available-auction-players',
  templateUrl: './available-auction-players.component.html',
  styleUrls: ['./available-auction-players.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AvailableAuctionPlayersComponent implements OnInit {

  @Input() bids: PlayerBid[];
  @Input() players: PlayerLookup[];

  @Output() playerBid: EventEmitter<PlayerBid> = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  filter: string;

  displayedColumns = ['name', 'nba', 'action'];
  dataSource = new MatTableDataSource<PlayerLookup>();

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.getAvailablePlayers();
    this.dataSource.filterPredicate = this.playerFilterPredicate();
  }

  getAvailablePlayers() {
    const bidIds = this.bids.map(bid => bid.player.id_player);
    return this.players.filter(player => !bidIds.includes(player.id_player) );
  }

  playerFilterPredicate() {
    const predicate = (data: PlayerLookup , rawFilter: string) => {
      if (!rawFilter) { return; }
      const filter = rawFilter.toLowerCase();

      const firstName = data.first_name.toLowerCase();
      if (firstName.startsWith(filter)) { return true; }

      const lastName = data.last_name.toLowerCase();
      if (lastName.startsWith(filter)) { return true; }

      const fullName = `${firstName} ${lastName}`;
      if (fullName.startsWith(filter)) { return true; }

      return false;
    };

    return predicate;
  }

  sendBid(player: PlayerLookup, bid: {salary: number, years: number}) {
    const playerBid: PlayerBid = {
      player,
      ...bid,
      id_bid: null,
      id_auction: null,
      team: null,
      expiration: null,
      history: [],
    };

    this.playerBid.emit(playerBid);
  }

  refreshAvailablePlayers() {
    this.dataSource.data = this.getAvailablePlayers();
  }

}
