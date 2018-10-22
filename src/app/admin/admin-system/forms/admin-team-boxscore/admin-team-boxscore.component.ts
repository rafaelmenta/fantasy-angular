import { Component, OnInit, Input } from '@angular/core';
import { BaseAdminNBATeam, AdminPlayerPerformance } from '../../../service/system/system';
import { compare } from '../../../../../lib/utils';

@Component({
  selector: 'app-admin-team-boxscore',
  templateUrl: './admin-team-boxscore.component.html',
  styleUrls: ['./admin-team-boxscore.component.css']
})
export class AdminTeamBoxscoreComponent implements OnInit {

  @Input() team: BaseAdminNBATeam;
  @Input() performances: AdminPlayerPerformance[];

  displayedColumns = ['player', 'min', 'fga', 'fta', 'off', 'def', 'ast', 'pf', 'stl', 'to', 'blk', 'pts'];
  result: number;

  constructor() { }

  onResultChange(result) {
    this.performances.forEach(perf => perf.win_loss = result);
  }

  ngOnInit() {
    const isWinner = this.performances.filter(perf => perf.win_loss === 1);
    this.result = isWinner.length > 0 ? 1 : -1;

    // Force initial run to avoid win_loss initially set as 0 from BE
    this.onResultChange(this.result);

    this.performances = this.performances.sort((a, b) => compare(a.minutes, b.minutes, false));
  }

}
