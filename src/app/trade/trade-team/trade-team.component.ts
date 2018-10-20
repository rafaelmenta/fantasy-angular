import { Component, OnInit, Input, OnChanges, Output, EventEmitter, Inject } from '@angular/core';
import { Team } from '../../services/team.service';
import { MatTableDataSource } from '@angular/material';
import { Player } from '../../services/player/player.service';
import { SelectionModel } from '@angular/cdk/collections';
import { TradePlayer } from '../../services/trade/trade.service';
import { Pick } from '../../services/pick/pick.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

const ALL_COLUMNS = ['select', 'name', 'p1', 'games', 'minutes', 'fpg', 'fpm', 'contract_salary', 'contract_years'];
const MOBILE_COLUMNS = ['select', 'name', 'p1', 'fpg', 'fpm', 'contract_salary'];

@Component({
  selector: 'app-trade-team',
  templateUrl: './trade-team.component.html',
  styleUrls: ['./trade-team.component.css']
})
export class TradeTeamComponent implements OnChanges, OnInit {

  @Input() team: Team['team_overview'];
  @Output() change: EventEmitter<{ players: Player[], picks: Pick[] }> = new EventEmitter();

  players: Player[];
  picks: Pick[];

  displayedColumns = ALL_COLUMNS;
  pickColumns = ['select', 'logo', 'year', 'round', 'team'];

  dataSource = new MatTableDataSource<Player>();
  pickSource = new MatTableDataSource<Pick>();

  selection = new SelectionModel<Player>(true, []);
  pickSelection = new SelectionModel<Pick>(true, []);

  get totalSalary() {
    if (this.dataSource.data.length > 0) {
      return this.dataSource.data.reduce((sum, player) => sum + player.salary.contract_salary, 0);
    }
    return 0;
  }

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

  onResize(res: BreakpointState) {
    this.displayedColumns = res.matches ? MOBILE_COLUMNS : ALL_COLUMNS;
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private breakpoint$: BreakpointObserver
  ) { }

  ngOnInit() {

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

    this.breakpoint$.observe(this.config.LARGE_MOBILE_QUERY).subscribe(this.onResize.bind(this));
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
