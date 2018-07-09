import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { AdminGame } from '../../service/game/admin-game';
import { AdminGameType, AdminGameService } from '../../service/game/admin-game.service';
import { SystemService } from '../../service/system/system.service';
import { Observable } from 'rxjs';
import { AdminRound } from '../../service/system/system';
import { AdminTeam } from '../../service/team/admin-team';

@Component({
  selector: 'app-admin-games',
  templateUrl: './admin-games.component.html',
  styleUrls: ['./admin-games.component.css']
})
export class AdminGamesComponent implements OnChanges {

  @Input() games: AdminGame[];
  @Input() teams: AdminTeam[];

  @Output() delete = new EventEmitter<AdminGame>();

  displayedColumns = ['home', 'away', 'type', 'round', 'remove'];
  dataSource = new MatTableDataSource<AdminGame>();
  rounds$: Observable<AdminRound[]>;

  search = {round: null, type: null, team: null};

  validGame(game: AdminGame) {
    const validRound = this.search.round ? this.search.round === game.round.round_number : true;
    const validType = this.search.type ? this.search.type === game.id_type : true;
    const validTeam = this.search.team ? [game.home_team.id_sl, game.away_team.id_sl].indexOf(this.search.team) > -1 : true;
    return validRound && validType && validTeam;
  }

  onSearchChange() {
    this.dataSource.data = this.games.filter(this.validGame.bind(this));
  }

  getGameType(id_type: number) {
    if (id_type === AdminGameType.LEAGUE) {
      return 'Temporada';
    }

    if (id_type === AdminGameType.PLAYOFF) {
      return 'Playoff';
    }

    return 'Amistoso';
  }

  onDelete(game: AdminGame) {
    this.delete.emit(game);
  }

  ngOnChanges() {
    this.onSearchChange();
    this.rounds$ = this.system.rounds$;
  }

  constructor(private system: SystemService) { }

}
