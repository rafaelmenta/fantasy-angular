import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerPerformances, PlayerRoundPerformance } from '../../services/player/player.service';
import { MatTableDataSource } from '@angular/material';
import { compare } from '../../../lib/utils';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

const ALL_STATS = [
  'rnd', 'min', 'fga', 'fta', 'orb', 'drb', 'trb',
  'ast', 'stl', 'blk', 'to', 'pf', 'pts', 'fps',
];

@Component({
  selector: 'app-player-last-games',
  templateUrl: './player-last-games.component.html',
  styleUrls: ['./player-last-games.component.css']
})
export class PlayerLastGamesComponent implements OnInit, OnChanges {

  @Input() performances$: Observable<PlayerPerformances>;

  datasource = new MatTableDataSource<PlayerRoundPerformance>();
  displayedColumns = ALL_STATS;
  smallScreen$: Observable<boolean>;
  isValidGame = (index: number, perf: PlayerRoundPerformance) => perf.minutes > 0;

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private breakpoint$: BreakpointObserver,
  ) {
  }

  ngOnInit() {
    const breakpoint$ = this.breakpoint$.observe(this.config.LARGE_MOBILE_QUERY);
    this.smallScreen$ = breakpoint$.pipe(map(res => res.matches));

    breakpoint$.subscribe(res => {
      if (res.matches) {
        this.displayedColumns = [
          'rnd', 'min', 'orb', 'trb',
          'ast', 'stl', 'blk', 'pts', 'fps',
        ];
      } else {
        this.displayedColumns = ALL_STATS;
      }
    });
  }


  ngOnChanges() {
    this.performances$.subscribe(perf => {
      if (perf) {
        this.datasource.data = perf.performances
          .sort((a, b) => compare(a.round.round_number, b.round.round_number, false))
          .filter((v, idx) => idx < 10);
      }
    });
  }

}
