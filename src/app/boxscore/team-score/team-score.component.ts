import { Component, OnInit, Input } from '@angular/core';
import { BoxscorePlayer, BoxscoreTeam, BoxscoreTeamPerformance } from '../../services/game/game.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-team-score',
  templateUrl: './team-score.component.html',
  styleUrls: ['./team-score.component.css']
})
export class TeamScoreComponent implements OnInit {

  @Input() info: BoxscoreTeam;
  @Input() performance: BoxscoreTeamPerformance;
  @Input() players: BoxscorePlayer[];

  datasource = new MatTableDataSource<BoxscorePlayer>();
  displayedColumns = [
    'name',
    'minutes-pg', 'minutes-sg', 'minutes-sf', 'minutes-pf', 'minutes-c',
    'min', 'fga', 'fta',
    'orb', 'drb',
    'ast', 'stl', 'blk', 'to', 'pf', 'pts',
    'fpm', 'fps', 'fpv',
  ];

  dnpColumns = ['name', 'dnp'];

  footerColumns = [
    'name',
    'minutes-pg', 'minutes-sg', 'minutes-sf', 'minutes-pf', 'minutes-c',
    'total', 'score'
  ];

  isValidGame = (index: number, stat: BoxscorePlayer) => stat.performance.minutes > 0;

  validMinutes(player: BoxscorePlayer, position: string) {
    if (player.primary_position === position) {
      return player.minutes_primary;
    }

    if (player.secondary_position === position) {
      return player.minutes_secondary;
    }
  }

  constructor() { }

  ngOnInit() {
    this.datasource.data = this.players;
  }

}
