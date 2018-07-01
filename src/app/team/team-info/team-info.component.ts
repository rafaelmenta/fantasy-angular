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

  constructor() { }

  ngOnInit() {
    this.results = [{ 'name': '', 'series': [
        { 'name': 'Vitórias', 'value': this.team.team_overview.record.win },
        { 'name': 'Derrotas', 'value': this.team.team_overview.record.loss },
      ],
    }];
  }

}
