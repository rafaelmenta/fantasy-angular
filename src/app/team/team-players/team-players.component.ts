import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Player } from '../../services/player/player.service';
import { MatSort, MatTableDataSource } from '@angular/material';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { compare } from '../../../lib/utils';

@Component({
  selector: 'app-team-players',
  templateUrl: './team-players.component.html',
  styleUrls: ['./team-players.component.css']
})
export class TeamPlayersComponent implements OnInit {

  @Input() players: Player[];

  defaultColumns = ['name', 'p1', 'p2', 'fpg', 'min', 'fpm'];

  displayedColumns;
  dataSource = new MatTableDataSource<Player>();

  getStat(player: Player, key: string) {
    if (player.stats && player.stats.length > 0) {
      return player.stats[player.stats.length - 1][key].toFixed(2);
    }

    return 0;
  }

  getFpm(player: Player) {
    const fps: number = this.getStat(player, 'fantasy_points');
    const minutes: number = this.getStat(player, 'minutes');

    if (Number(minutes) !== 0) {
      return (fps / minutes).toFixed(2);
    }
    return 0;
  }

  onBreakpointChange(state: BreakpointState) {
    if (state.matches) {
      this.displayedColumns = ['name', 'p1p2', 'fpg', 'fpm'];
    } else {
      this.displayedColumns = this.defaultColumns;
    }
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private breakpoint$: BreakpointObserver) { }

    ngOnInit() {
      this.dataSource.data = this.players.sort((a, b) => compare(a.team_info.order, b.team_info.order, true));
      this.breakpoint$.observe(this.config.LARGE_MOBILE_QUERY).subscribe(this.onBreakpointChange.bind(this));
  }

}
