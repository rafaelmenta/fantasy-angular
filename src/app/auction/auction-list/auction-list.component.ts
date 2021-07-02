import { Component, Input, OnInit } from '@angular/core';
import { Auction } from 'src/app/services/auction/auction.service';

@Component({
  selector: 'app-auction-list',
  templateUrl: './auction-list.component.html',
  styleUrls: ['./auction-list.component.css']
})
export class AuctionListComponent implements OnInit {

  @Input() auctions: Auction[];

  constructor() { }

  ngOnInit() {
  }

}
