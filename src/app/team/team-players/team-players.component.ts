import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Player } from '../../services/player/player.service';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {

  @Input() players: Player[];

  displayedColumns = ['name', 'p1', 'p2', 'fpg', 'min', 'fpm'];
  dataSource = new MatTableDataSource<Player>();

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.players.sort((a, b) => {
      if (a.team_info.order < b.team_info.order) { return -1; }
      if (a.team_info.order > b.team_info.order) { return 1; }
      return 0;
    });
  }

}
