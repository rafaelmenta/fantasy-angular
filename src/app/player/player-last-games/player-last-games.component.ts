import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerPerformances, PlayerRoundPerformance } from '../../services/player/player.service';
import { MatTableDataSource } from '@angular/material';
import { compare } from '../../../lib/utils';

@Component({
  selector: 'app-player-last-games',
  templateUrl: './player-last-games.component.html',
  styleUrls: ['./player-last-games.component.css']
})
export class PlayerLastGamesComponent implements OnChanges {

  @Input() performances$: Observable<PlayerPerformances>;

  datasource = new MatTableDataSource<PlayerRoundPerformance>();
  displayedColumns = [
    'rnd', 'min', 'fga', 'fta', 'orb', 'drb', 'trb',
    'ast', 'stl', 'blk', 'to', 'pf', 'pts', 'fps',
  ];
  isValidGame = (index: number, perf: PlayerRoundPerformance) => perf.minutes > 0;

  constructor() { }


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
