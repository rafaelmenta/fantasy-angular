import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-system-summary',
  templateUrl: './admin-system-summary.component.html',
  styleUrls: ['./admin-system-summary.component.css']
})
export class AdminSystemSummaryComponent implements OnInit {

  activeSchedule: boolean;
  activeRounds: boolean;
  activeGames: boolean;

  constructor() { }

  ngOnInit() {
  }

}
