import { Component, OnInit, Input, OnChanges, Output, EventEmitter, Inject } from '@angular/core';
import { Team } from '../../services/team.service';
import { MatTableDataSource } from '@angular/material';
import { Player } from '../../services/player/player.service';
import { SelectionModel } from '@angular/cdk/collections';
import { TradePlayer } from '../../services/trade/trade.service';
import { Pick } from '../../services/pick/pick.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-trade-team',
  templateUrl: './trade-team.component.html',
  styleUrls: ['./trade-team.component.css']
})
export class TradeTeamComponent implements OnChanges, OnInit {

  @Input() team: Team['team'];
  @Output() change: EventEmitter<{ players: Player[], picks: Pick[] }> = new EventEmitter();

  players: Player[];
  picks: Pick[];
  statAccuracy: number;

  displayedColumns = ['select', 'name', 'p1', 'p2', 'fpg', 'fpm'];
  pickColumns = ['select', 'logo', 'year', 'round', 'team'];

  dataSource = new MatTableDataSource<Player>();
  pickSource = new MatTableDataSource<Pick>();

  selection = new SelectionModel<Player>(true, []);
  pickSelection = new SelectionModel<Pick>(true, []);

  clearSelection() {
    this.selection.clear();
    this.pickSelection.clear();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllPicksSelected() {
    const numSelected = this.pickSelection.selected.length;
    const numRows = this.pickSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  masterPickToggle() {
    this.isAllPicksSelected() ?
      this.pickSelection.clear() :
      this.pickSource.data.forEach(row => this.pickSelection.select(row));
  }

  updatePlayers(added: Player[], removed: Player[]) {
    this.players = this.players.concat(added).filter(player => removed.indexOf(player) < 0);
  }

  updatePicks(added: Pick[], removed: Pick[]) {
    this.picks = this.picks.concat(added).filter(pick => removed.indexOf(pick) < 0);
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private breakpoint$: BreakpointObserver
  ) { }

  ngOnInit() {

    this.breakpoint$.observe(this.config.LARGE_MOBILE_QUERY).subscribe(res => {
      if (res.matches) {
        this.statAccuracy = 2;
      } else {
        this.statAccuracy = 3;
      }
    });

    this.selection.onChange.subscribe(change => {
      this.updatePlayers(change.added, change.removed);
      this.change.emit({
        players: this.players,
        picks: this.picks,
      });
    });

    this.pickSelection.onChange.subscribe(change => {
      this.updatePicks(change.added, change.removed);
      this.change.emit({
        players: this.players,
        picks: this.picks,
      });
    });
  }

  ngOnChanges() {
    if (this.team) {
      this.dataSource.data = this.team.players;
      this.pickSource.data = this.team.picks;
      this.selection.clear();
      this.players = [];
      this.picks = [];
    }

  }

}
