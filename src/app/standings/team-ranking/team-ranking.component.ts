import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TeamInfo } from '../../../typings';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-team-ranking',
  templateUrl: './team-ranking.component.html',
  styleUrls: ['./team-ranking.component.css']
})
export class TeamRankingComponent implements OnInit, OnChanges {

  @Input() teams: TeamInfo[];
  @Input() highlightTeam: Team;
  @Input() elevate: boolean;

  sortedTeams: TeamInfo[];
  rankColumns = ['position', 'team', 'win', 'loss', 'fpg'];

  constructor() { }

  ngOnChanges() {
    if (this.teams) {
      this.sortedTeams = this.teams.sort((a, b) => {
        if (a.record.win > b.record.win) {
          return -1;
        }

        if (b.record.win > a.record.win) {
          return 1;
        }

        if (a.stats && b.stats && a.stats.fantasy_points > b.stats.fantasy_points) {
          return -1;
        }

        if (a.stats && b.stats && b.stats.fantasy_points > a.stats.fantasy_points) {
          return 1;
        }

        return 0;
      });
    }
  }

  ngOnInit() {
  }
}
