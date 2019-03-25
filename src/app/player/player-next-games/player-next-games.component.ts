import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerNextGame } from '../../services/player/player.service';
import { MatTableDataSource } from '@angular/material';
import { GameNba } from '../../services/nba.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-player-next-games',
  templateUrl: './player-next-games.component.html',
  styleUrls: ['./player-next-games.component.css']
})
export class PlayerNextGamesComponent implements OnInit {

  @Input() games: Observable<PlayerNextGame>;

  nextGames$: Observable<PlayerNextGame>;

  displayedColumns = ['logo-home', 'logo-away', 'game', 'gamedate', 'gametime'];
  datasource = new MatTableDataSource<GameNba>();
  constructor() { }

  ngOnInit() {
    this.nextGames$ = this.games.pipe(
      tap(player => this.datasource.data = player.next_games)
    );
  }

}
