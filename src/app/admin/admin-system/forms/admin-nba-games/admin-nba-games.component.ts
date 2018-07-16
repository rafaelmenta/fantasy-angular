import * as moment from 'moment-timezone';
import { Component, OnChanges, Input, OnInit } from '@angular/core';
import { AdminGameNBA, AdminRound, BaseAdminNBATeam } from '../../../service/system/system';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { SystemService } from '../../../service/system/system.service';
import { compare } from '../../../../../lib/utils';

@Component({
  selector: 'app-admin-nba-games',
  templateUrl: './admin-nba-games.component.html',
  styleUrls: ['./admin-nba-games.component.css']
})
export class AdminNbaGamesComponent implements OnInit, OnChanges {

  @Input() games: AdminGameNBA[];

  rounds$: Observable<AdminRound[]>;
  teams$: Observable<BaseAdminNBATeam[]>;

  dataSource = new MatTableDataSource<AdminGameNBA>();
  displayedColumns = ['round_home', 'home', 'away', 'round_away', 'date', 'action'];
  search: {team: number; round: number; };

  constructor(private system: SystemService, private snackbar: MatSnackBar) { }

  onSearchChange() {
    this.dataSource.data = this.games.filter(this.validGame.bind(this));
  }

  validGame(game: AdminGameNBA) {
    const validRound = this.search.round ? [game.round_home.round_number, game.round_away.round_number].includes(this.search.round) : true;
    const validTeam = this.search.team ? [game.home.id_nba, game.away.id_nba].includes(this.search.team) : true;
    return validRound && validTeam;
  }

  onDelete(game: AdminGameNBA) {
    this.system.deleteNbaGame(game.id_game_nba).subscribe(res => {
      if (res.deleteNbaGame) {
        this.snackbar.open('Jogo removido', null, {duration: 3000});
        this.games = this.games.filter(g => g.id_game_nba !== game.id_game_nba);
        this.onSearchChange();
      }
    });
  }

  ngOnInit() {
    this.rounds$ = this.system.rounds$;
    this.teams$ = this.system.nbaTeams$;
    this.search = {team: undefined, round: undefined};
  }

  ngOnChanges() {
    this.games.forEach(game => {
      const newYorkTime = moment.tz(new Date(game.game_time), 'America/New_York');
      game.gametime = newYorkTime;
    });
    this.dataSource.data = this.games.sort((a, b) => compare(a.gametime, b.gametime, true));
  }

}
