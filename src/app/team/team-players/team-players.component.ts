import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Player } from '../../services/player/player.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {

  @Input() players: Player[];

  displayedColumns = ['name', 'p1', 'p2', 'fpg', 'min', 'fpm'];
  dataSource = new MatTableDataSource<Player>();
  statAccuracy = 3;

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private breakpoint$: BreakpointObserver) { }

    ngOnInit() {
      this.dataSource.data = this.players.sort((a, b) => {
        if (a.team_info.order < b.team_info.order) { return -1; }
        if (a.team_info.order > b.team_info.order) { return 1; }
        return 0;
      });

      this.breakpoint$.observe(this.config.LARGE_MOBILE_QUERY).subscribe(res => {
        if (res.matches) {
          this.displayedColumns = ['name', 'p1p2', 'fpg', 'fpm'];
          this.statAccuracy = 2;
        } else {
          this.displayedColumns = ['name', 'p1', 'p2', 'fpg', 'min', 'fpm'];
          this.statAccuracy = 3;
      }
    });
  }

}
