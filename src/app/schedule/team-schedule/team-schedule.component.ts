import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../services/game/game.service';
import { TeamService, Team } from '../../services/team.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.css']
})
export class TeamScheduleComponent implements OnInit {

  @Input() team: Team;
  games$: Observable<Game[]>;

  constructor(private teamService: TeamService, private title: Title) { }

  getOpponent(game: Game) {
    if (this.team.id_sl === game.home_team.id_sl) {
      return game.away_team;
    }
    return game.home_team;
  }

  ngOnInit() {
    this.title.setTitle(`Superliga - Calendario da equipe`);
    this.games$ = this.teamService.getTeamGames(this.team.id_sl);
  }

}
