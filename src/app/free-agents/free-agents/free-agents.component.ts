import { Component, OnInit, ViewChild } from '@angular/core';
import { LeagueService } from '../../services/league/league.service';
import { Observable } from 'rxjs';
import { Player } from '../../services/player/player.service';
import { sortPlayers, compare } from '../../../lib/utils';
import { MatTableDataSource, Sort, MatSort, MatSortable, MatSnackBar } from '@angular/material';
import { UserService, UserTeam } from '../../services/user.service';
import { TeamService, Team } from '../../services/team.service';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-free-agents',
  templateUrl: './free-agents.component.html',
  styleUrls: ['./free-agents.component.css']
})
export class FreeAgentsComponent implements OnInit {
  displayedColumns = ['name', 'nba', 'p1', 'p2', 'action'];
  dataSource = new MatTableDataSource<Player>();

  freeAgents$: Observable<Player[]>;
  defaultTeam: UserTeam;
  faLocked: boolean;

  constructor(
    private leagueService: LeagueService,
    private userService: UserService,
    private teamService: TeamService,
    private title: Title,
    private angulartics2: Angulartics2,
    private snackbar: MatSnackBar,
  ) { }

  addPlayer(player: Player) {
    this.teamService.addPlayer(this.defaultTeam, player)
      .subscribe(res => {
        const action = res.recruitPlayer ? 'add-player' : 'add-player-fail';
        const message = res.recruitPlayer ? 'Jogador adicionado' : 'Jogador não disponível';

        this.angulartics2.eventTrack.next({
          action,
          properties: {
            category: player.player_slug,
          }
        });

        this.snackbar.open(message, null, {duration: 3000});
      });
  }

  ngOnInit() {
    this.title.setTitle(`Superliga - Free agents`);
    this.userService.user.subscribe(user => {
      if (user) {
        this.defaultTeam = this.teamService.getDefaultTeam(user.teams);
        const id = this.defaultTeam.team.division.conference.league.id_league;

        this.leagueService.getConfigs(id).subscribe(res => {
          const faLocked = res.filter(config => config.id_config === 'FREE_AGENCY_LOCKED' && config.config_value === '1');
          this.faLocked = faLocked.length > 0;
          if (!this.faLocked) {
            this.freeAgents$ = this.leagueService.getFreeAgents(id);
            this.freeAgents$.subscribe(freeAgents => {
              if (freeAgents) {
                this.dataSource.data = freeAgents.slice().sort(sortPlayers);
              }
            });
          }
        });
      }
    });
  }

}
