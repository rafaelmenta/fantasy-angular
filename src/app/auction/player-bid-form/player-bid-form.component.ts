import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-player-bid-form',
  templateUrl: './player-bid-form.component.html',
  styleUrls: ['./player-bid-form.component.css']
})
export class PlayerBidFormComponent implements OnInit {

  constructor() { }

  salary: number;
  years: number;

  @Output() bid: EventEmitter<{salary: number, years: number}> = new EventEmitter();
  @Output() close = new EventEmitter();

  ngOnInit() {
  }

  resetForm() {
    this.salary = null;
    this.years = null;
  }

  closeForm() {
    this.close.emit();
  }

  sendBid() {
    let valid = true;

    if (!this.salary || this.salary <= 0) {
      this.salary = null;
      valid = false;
    }

    if (!this.years || this.years <= 0) {
      this.years = null;
      valid = false;
    }

    if (valid) {
      this.bid.emit({salary: this.salary, years: this.years});
      this.resetForm();
      this.closeForm();
    }
  }

}
