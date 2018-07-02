import { Component, OnInit, Input } from '@angular/core';
import { PlayerStat, Player } from '../../services/player/player.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  @Input() stats: PlayerStat;
  @Input() player: Player;

  datasource = new MatTableDataSource<PlayerStat>();
  displayedColumns = ['points', 'rebounds', 'assists'];

  constructor() { }

  ngOnInit() {
    this.datasource.data = [this.stats];
  }

}
