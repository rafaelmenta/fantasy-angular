import { Component, OnInit, Input, INJECTOR, Inject } from '@angular/core';
import { BoxscorePlayer, BoxscoreTeam, BoxscoreTeamPerformance } from '../../services/game/game.service';
import { MatTableDataSource } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { APP_CONFIG, AppConfig } from '../../app.config';

const ALL_STATS = [
  'name',
  'minutes-pg', 'minutes-sg', 'minutes-sf', 'minutes-pf', 'minutes-c',
  'min', 'fga', 'fta',
  'orb', 'drb',
  'ast', 'stl', 'blk', 'to', 'pf', 'pts',
  'fpm', 'fps', 'fpv',
];

const ALL_FOOTER_STATS = [
  'name',
  'minutes-pg', 'minutes-sg', 'minutes-sf', 'minutes-pf', 'minutes-c',
  'total', 'score'
];

@Component({
  selector: 'app-team-score',
  templateUrl: './team-score.component.html',
  styleUrls: ['./team-score.component.css']
})
export class TeamScoreComponent implements OnInit {

  @Input() info: BoxscoreTeam;
  @Input() performance: BoxscoreTeamPerformance;
  @Input() players: BoxscorePlayer[];
  @Input() isHome: boolean;

  datasource = new MatTableDataSource<BoxscorePlayer>();
  displayedColumns = ALL_STATS;

  dnpColumns = ['name', 'dnp'];

  footerColumns = ALL_FOOTER_STATS;

  isValidGame = (index: number, stat: BoxscorePlayer) => stat.performance.minutes > 0;

  validMinutes(player: BoxscorePlayer, position: string) {
    if (player.primary_position === position) {
      return player.minutes_primary;
    }

    if (player.secondary_position === position) {
      return player.minutes_secondary;
    }
  }

  get teamScore() {
    return this.performance.fantasy_points + (this.isHome ? +3 : -3);
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private breakpoint$: BreakpointObserver) { }

  ngOnInit() {
    this.datasource.data = this.players;
    this.breakpoint$.observe(this.config.LARGE_MOBILE_QUERY).subscribe(res => {
      if (res.matches) {
        this.displayedColumns = [
          'name',
          'trb',
          'ast', 'stl', 'pts',
          'fps', 'fpv',
        ];

        this.footerColumns = [
          'total', 'score'
        ];
      } else {
        this.displayedColumns = ALL_STATS;
        this.footerColumns = ALL_FOOTER_STATS;
      }
    });
  }

}
