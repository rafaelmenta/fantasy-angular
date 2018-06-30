import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../services/game/game.service';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-next-team-games',
  templateUrl: './next-team-games.component.html',
  styleUrls: ['./next-team-games.component.css']
})
export class NextTeamGamesComponent implements OnInit {

  @Input() games: Game[];
  @Input() team: Team;

  getOpponent(game: Game) {
    if (this.team.team_overview.id_sl === game.home_team.id_sl) {
      return game.away_team;
    }
    return game.home_team;
  }

  constructor() { }

  ngOnInit() {
  }

}
