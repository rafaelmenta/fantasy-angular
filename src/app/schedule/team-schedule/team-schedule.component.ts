import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Game, GameType } from '../../services/game/game.service';
import { TeamService, Team, BasicTeam } from '../../services/team.service';
import { Title } from '@angular/platform-browser';
import { UserTeam } from '../../services/user.service';

@Component({
  selector: 'app-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.css']
})
export class TeamScheduleComponent implements OnInit {

  @Input() team: UserTeam;
  @Input() type: GameType;

  games$: Observable<Game[]>;
  private scheduleTeam: BasicTeam;

  constructor(private teamService: TeamService, private title: Title) { }

  getOpponent(game: Game) {
    if (this.scheduleTeam.id_sl === game.home_team.id_sl) {
      return game.away_team;
    }
    return game.home_team;
  }

  onTeamChange(team: BasicTeam) {
    this.scheduleTeam = team;
    this.games$ = this.getGames();
  }

  getGames() {
    if (this.type === GameType.PLAYOFFS) {
      return this.teamService.getTeamPlayoffsGames(this.team.id_sl);
    }

    return this.teamService.getTeamGames(this.team.id_sl);
  }

  ngOnInit() {
    this.scheduleTeam = {id_sl: this.team.id_sl} as BasicTeam;
    this.title.setTitle(`Superliga - Calendario da equipe`);
    this.games$ = this.getGames();
  }

}
