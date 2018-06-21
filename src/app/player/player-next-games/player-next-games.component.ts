import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerNextGame } from '../../services/player/player.service';
import { MatTableDataSource } from '@angular/material';
import { GameNba } from '../../services/nba.service';

@Component({
  selector: 'app-player-next-games',
  templateUrl: './player-next-games.component.html',
  styleUrls: ['./player-next-games.component.css']
})
export class PlayerNextGamesComponent implements OnChanges {

  @Input() games: Observable<PlayerNextGame>;

  displayedColumns = ['logo-home', 'logo-away', 'game', 'gamedate', 'gametime'];
  datasource = new MatTableDataSource<GameNba>();
  constructor() { }

  ngOnChanges() {
    if (this.games) {
      this.games.subscribe(player => this.datasource.data = player.next_games);
    }
  }

}
