import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../services/game/game.service';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-recent-team-games',
  templateUrl: './recent-team-games.component.html',
  styleUrls: ['./recent-team-games.component.css']
})
export class RecentTeamGamesComponent implements OnInit {

  @Input() games: Game[];
  @Input() team: Team;

  getOpponent(game: Game) {
    if (this.team.team_overview.id_sl === game.home_team.id_sl) {
      return game.away_team;
    }
    return game.home_team;
  }

  getTeamPerformance(game: Game) {
    if (this.team.team_overview.id_sl === game.home_team.id_sl) {
      return game.home_performance && game.home_performance.fantasy_points;
    }
    return game.away_performance && game.away_performance.fantasy_points;
  }

  getOpponentPerformance(game: Game) {
    if (this.team.team_overview.id_sl === game.home_team.id_sl) {
      return game.away_performance && game.away_performance.fantasy_points;
    }
    return game.home_performance && game.home_performance.fantasy_points;
  }

  constructor() {
  }

  ngOnInit() {
  }
}
