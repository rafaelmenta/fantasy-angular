import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SystemService } from '../../../service/system/system.service';
import { AdminGameNBA } from '../../../service/system/system';

import * as moment from 'moment-timezone';
import { compare } from '../../../../../lib/utils';

@Component({
  selector: 'app-admin-active-games',
  templateUrl: './admin-active-games.component.html',
  styleUrls: ['./admin-active-games.component.css']
})
export class AdminActiveGamesComponent implements OnInit {

  dataSource = new MatTableDataSource<AdminGameNBA>();
  displayedColumns = ['home', 'away', 'rounds', 'date', 'boxDone', 'action'];

  constructor(private system: SystemService) { }

  ngOnInit() {
    this.system.getNbaGames(true).subscribe(games => {
      games.forEach(game => {
        const newYorkTime = moment.tz(new Date(game.game_time), 'America/New_York');
        game.gametime = newYorkTime;
      });
      this.dataSource.data = games.sort((a, b) => compare(a.gametime, b.gametime, true));
    });
  }

}
