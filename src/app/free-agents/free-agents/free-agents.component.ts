import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../../services/league/league.service';
import { Observable } from 'rxjs';
import { Player } from '../../services/player/player.service';
import { UserService, UserTeam, User } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { Title } from '@angular/platform-browser';
import { AdminLeagueConfig } from '../../admin/service/league/admin-league';
import { sortPlayers } from '../../../lib/utils';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-free-agents',
  templateUrl: './free-agents.component.html',
  styleUrls: ['./free-agents.component.css']
})
export class FreeAgentsComponent implements OnInit {

  freeAgents$: Observable<Player[]>;
  defaultTeam: UserTeam;
  faLocked: boolean;

  constructor(
    private leagueService: LeagueService,
    private userService: UserService,
    private teamService: TeamService,
    private title: Title,
  ) { }

  onLeagueConfigLoad(id: number, res: AdminLeagueConfig[], ) {
    const faLocked = res.filter(config =>
      config.id_config === 'FREE_AGENCY_LOCKED' && config.config_value === '1');

    this.faLocked = faLocked.length > 0;
    if (!this.faLocked) {
      this.freeAgents$ = this.leagueService.getFreeAgents(id).pipe(map(players => {
        if (players) {
          return players.slice().sort(sortPlayers);
        }
      }));
    }
  }

  onUserLoad(user?: User) {
    if (user) {
      this.defaultTeam = this.teamService.getDefaultTeam(user.teams);
      const id = this.defaultTeam.team.division.conference.league.id_league;
      this.leagueService.getConfigs(id).subscribe(this.onLeagueConfigLoad.bind(this, id));

      // Force load so team store is initialized
      this.teamService.getTeam(this.defaultTeam.id_sl, true).subscribe();
    }
  }

  ngOnInit() {
    this.title.setTitle(`Superliga - Free agents`);
    this.userService.user.subscribe(this.onUserLoad.bind(this));
  }

}
