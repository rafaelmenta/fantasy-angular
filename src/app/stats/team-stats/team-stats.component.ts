import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { TeamService, Team } from '../../services/team.service';
import { Observable } from 'rxjs';
import { StatPlayer, Player } from '../../services/player/player.service';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  players$: Observable<StatPlayer[]>;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle(`Superliga - Estatísticas da equipe`);
    let user: User;
    this.userService.user.subscribe(u => user = u);
    const defaultTeam = this.teamService.getDefaultTeam(user.teams);
    this.players$ = this.teamService.getRosterStats(defaultTeam.id_sl).pipe(map(this.formatStats.bind(this)));
  }

  formatPlayerStat(player: Player): StatPlayer {
    const stats = player.stats[0] as StatPlayer;
    return {
      ...stats,
      player: {
        ...player,
        default_primary: player.team_info.primary_position,
        default_secondary: player.team_info.secondary_position,
      },
    };
  }

  formatStats(res: Team): StatPlayer[] {
    const players = res.team.players;
    return players.map(this.formatPlayerStat);
  }
}
