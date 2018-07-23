import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../services/team.service';

@Component({
  selector: 'app-team-picker-card',
  templateUrl: './team-picker-card.component.html',
  styleUrls: ['./team-picker-card.component.css']
})
export class TeamPickerCardComponent implements OnInit {

  @Input() team: Team['team_overview'];

  hoverActive: boolean;

  constructor() { }

  ngOnInit() {
  }

}
