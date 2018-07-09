import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminLeagueInfo } from '../../../service/league/admin-league';

@Component({
  selector: 'app-league-info',
  templateUrl: './league-info.component.html',
  styleUrls: ['./league-info.component.css']
})
export class LeagueInfoComponent implements OnInit {

  @Input() league: AdminLeagueInfo;
  @Output() save = new EventEmitter<AdminLeagueInfo>();

  constructor() { }

  onSave(league) {
    this.save.emit(league);
  }

  ngOnInit() {
  }

}
