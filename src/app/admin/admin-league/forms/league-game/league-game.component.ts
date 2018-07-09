import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AdminGame } from '../../../service/game/admin-game';
import { SystemService } from '../../../service/system/system.service';
import { AdminRound } from '../../../service/system/system';
import { Observable } from 'rxjs';
import { AdminTeam } from '../../../service/team/admin-team';

@Component({
  selector: 'app-league-game',
  templateUrl: './league-game.component.html',
  styleUrls: ['./league-game.component.css']
})
export class LeagueGameComponent implements OnInit {
  @Input() teams: AdminTeam[];

  game: AdminGame;
  rounds$: Observable<AdminRound[]>;
  @Output() save = new EventEmitter<AdminGame>();

  onSave() {
    this.save.emit(this.game);
  }

  get isValid() {
    const game = this.game;
    return game.away_team && game.home_team && game.id_type && game.id_round;
  }

  ngOnInit() {
    this.game = {} as AdminGame;
    this.rounds$ = this.system.rounds$;
  }

  constructor(private system: SystemService) { }

}
