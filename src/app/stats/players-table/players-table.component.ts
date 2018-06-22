import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StatPlayer } from '../../services/player/player.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FilterService, PlayerFilters } from '../../services/filter.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { compare } from '../../../lib/utils';

const ALL_STATS = [
  'name', 'games', 'minutes',
  'field_goal_attempts',
  'free_throw_attempts',
  'offensive_rebounds',
  'defensive_rebounds',
  'total_rebounds',
  'assists',
  'steals',
  'blocks',
  'turnovers',
  'personal_fouls',
  'points',
  'fantasy_points',
  'fpm'
];

@Component({
  selector: 'app-players-table',
  templateUrl: './players-table.component.html',
  styleUrls: ['./players-table.component.css']
})
export class PlayersTableComponent implements OnInit {

  @Input() players: StatPlayer[];
  @ViewChild(MatSort) sort: MatSort;

  filters$: Observable<PlayerFilters>;

  datasource: MatTableDataSource<StatPlayer>;
  displayedColumns = ALL_STATS;

  constructor(private filterService: FilterService) { }

  updateDatasource(filters: PlayerFilters) {
    const columns = filters.statColumns && filters.statColumns[0];
    if (columns && columns.length > 1) {
      this.displayedColumns = columns;
    } else {
      this.displayedColumns = ALL_STATS;
    }

    this.datasource.data = this.players.filter(stat => {
      let valid = true;
      const player = stat.player;

      const positions = filters.positions;
      if (positions && positions.length > 0) {
        valid = valid && (positions.indexOf(player.default_primary) > -1 || positions.indexOf(player.default_secondary) > -1);
      }

      if (filters.team) {
        valid = valid && player.team_nba.id_nba === filters.team;
      }

      if (filters.rookies) {
        valid = valid && player.rookie;
      }

      if (filters.freeAgents) {
        valid = valid && player.team_info === null;
      }

      return valid;
    });
  }

  ngOnInit() {
    this.datasource = new MatTableDataSource<StatPlayer>(this.players);
    this.datasource.sort = this.sort;
    this.filters$ = this.filterService.filters$;
    this.filters$.subscribe(filters => this.updateDatasource(filters));
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.datasource.sortData = (data, sort: MatSort) => {
      const asc = sort.direction === 'asc';
      const sortedData = data.sort((a, b) => {
        let aValue;
        let bValue;

        if (sort.active === 'name') {
          aValue = `${a.player.first_name} ${a.player.last_name}`;
          bValue = `${b.player.first_name} ${b.player.last_name}`;
        } else if (sort.active === 'total_rebounds') {
          aValue = a.defensive_rebounds + a.offensive_rebounds;
          bValue = b.defensive_rebounds + b.offensive_rebounds;
        } else if (sort.active === 'fpm') {
          aValue = a.fantasy_points / a.minutes;
          bValue = b.fantasy_points / b.minutes;
        } else {
          aValue = a[sort.active];
          bValue = b[sort.active];
        }

        if (sort.active !== 'name') {
          aValue = isNaN(aValue) ? 0 : aValue;
          bValue = isNaN(bValue) ? 0 : bValue;
        }

        return compare(aValue, bValue, asc);
      });
      return sortedData;
    };
  }
}
