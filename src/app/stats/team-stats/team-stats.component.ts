import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { TeamService, Team, StatsTeam } from '../../services/team.service';
import { Observable } from 'rxjs';
import { StatPlayer, Player } from '../../services/player/player.service';
import { map, filter, mergeMap } from 'rxjs/operators';
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

    this.players$ = this.userService.user.pipe(
      filter(user => user !== undefined),
      map(user => this.teamService.getDefaultTeam(user.teams)),
      mergeMap(team => this.teamService.getRosterStats(team.id_sl)),
      map(stats => this.formatStats(stats))
    );
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

  formatStats(res: StatsTeam): StatPlayer[] {
    const players = res.team.players;
    return players.map(this.formatPlayerStat);
  }
}
