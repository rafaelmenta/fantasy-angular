import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.css']
})
export class TeamInfoComponent implements OnInit {

  @Input() team: Team;
  results: any;

  colors = { domain: ['#5AA454', '#A10A28'] };
  hideChart = false;

  constructor() { }

  getScoreData(record: Team['team_overview']['record']) {
    return [{
      'name': '',
      'series': [
        { 'name': 'Vitórias', 'value': record.win },
        { 'name': 'Derrotas', 'value': record.loss },
      ],
    }];
  }

  ngOnInit() {
    const record = this.team.team_overview.record;

    if (record.win > 0 || record.loss > 0) {
      this.results = this.getScoreData(record);
    } else {
      this.hideChart = true;
    }
  }

}
