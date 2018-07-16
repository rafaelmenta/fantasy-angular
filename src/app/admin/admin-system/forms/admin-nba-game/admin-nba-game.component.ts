import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminRound, BaseAdminNBATeam, AdminGameNBA } from '../../../service/system/system';
import { SystemService } from '../../../service/system/system.service';
import { Observable } from 'rxjs';

import * as moment from 'moment-timezone';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-nba-game',
  templateUrl: './admin-nba-game.component.html',
  styleUrls: ['./admin-nba-game.component.css']
})
export class AdminNbaGameComponent implements OnInit {

  @Output() create = new EventEmitter<AdminGameNBA>();

  game: AdminGameNBA;
  rounds$: Observable<AdminRound[]>;
  nbaTeams$: Observable<BaseAdminNBATeam[]>;

  constructor(private system: SystemService, private snackbar: MatSnackBar) { }

  getEmptyGame() {
    return {} as AdminGameNBA;
  }

  get isValid() {
    const game = this.game;
    return game.home && game.away && game.round_home && game.round_away && game.date && game.time &&
      game.home.id_nba !== game.away.id_nba;
  }

  onSave(game: AdminGameNBA) {
    const newYorkDate = moment.tz(game.date, 'America/New_York');
    const time = moment(game.time, 'H:mm');

    newYorkDate.set('h', time.get('h'));
    newYorkDate.set('m', time.get('m'));

    const input = {
      id_home: game.home.id_nba,
      id_away: game.away.id_nba,
      id_round_home: game.round_home.id_round,
      id_round_away: game.round_away.id_round,
      game_time: newYorkDate.format('YYYY-MM-DD H:mm:ss'),
    };

    this.system.addNbaGame(input).subscribe(res => {
      if (res.addNbaGame) {
        game.id_game_nba = res.addNbaGame;
        game.gametime = newYorkDate;
        this.create.emit(game);
        this.snackbar.open('Jogo criado', null, {duration: 3000});

      }
    });
  }

  ngOnInit() {
    this.game = this.getEmptyGame();
    this.rounds$ = this.system.rounds$;
    this.nbaTeams$ = this.system.nbaTeams$;
  }

}
