import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Auction, AuctionStatus } from 'src/app/services/auction/auction.service';
import { SalaryCap } from 'src/app/services/team.service';

@Component({
  selector: 'app-auction-info',
  templateUrl: './auction-info.component.html',
  styleUrls: ['./auction-info.component.css']
})
export class AuctionInfoComponent implements OnInit {

  private WARNING_THRESHOLD = 10 * 1000 * 1000; // $5M;

  @Input() auction: Auction;
  @Input() cap: SalaryCap;
  @Input() waiver: number;
  @Output() refresh = new EventEmitter();

  intervalOption = 30;
  secondsToRefresh: number;
  intervalId: number;

  constructor() { }

  ngOnInit() {
    this.startCountdown();
  }

  tick() {
    --this.secondsToRefresh;

    if (this.secondsToRefresh === 0) {
      clearInterval(this.intervalId);
      this.refresh.emit();
      this.startCountdown();
    }
  }

  startCountdown() {
    this.secondsToRefresh = this.intervalOption;
    this.intervalId = setInterval(this.tick.bind(this), 1000) as any as number;
  }

  get showWarning() {
    const {salary_cap, team_salaries, open_bids} = this.cap;
    return (salary_cap - team_salaries - open_bids) < this.WARNING_THRESHOLD;
  }

  get showAvailable() {
    const { salary_cap, team_salaries, open_bids } = this.cap;
    return (salary_cap - team_salaries - open_bids) > this.WARNING_THRESHOLD;
  }

  get isOpen() {
    return this.auction.status === AuctionStatus.OPEN;
  }

  get statusLabel() {
    if (this.isOpen) {
      return 'Aberto';
    }

    return 'Fechado';
  }

}
