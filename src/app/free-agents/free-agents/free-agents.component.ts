import { Component, OnInit, ViewChild } from '@angular/core';
import { LeagueService } from '../../services/league/league.service';
import { Observable } from 'rxjs';
import { Player } from '../../services/player/player.service';
import { sortPlayers, compare } from '../../../lib/utils';
import { MatTableDataSource, Sort, MatSort, MatSortable, MatSnackBar } from '@angular/material';
import { UserService } from '../../services/user.service';
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
  defaultTeam: Team;

  constructor(
    private leagueService: LeagueService,
    private userService: UserService,
    private teamService: TeamService,
    private title: Title,
    private angulartics2: Angulartics2,
    private snackbar: MatSnackBar,
  ) { }

  addPlayer(player: Player) {
    this.teamService.addPlayer(this.defaultTeam.id_sl, player)
      .subscribe(res => {
        this.angulartics2.eventTrack.next({
          action: 'add-player',
          properties: {
            category: player.player_slug,
          }
        });

        this.snackbar.open('Jogador adicionado', null, {duration: 3000});
      });
  }

  ngOnInit() {
    this.title.setTitle(`Superliga - Free agents`);
    this.userService.user.subscribe(user => {
      if (user) {
        this.defaultTeam = this.teamService.getDefaultTeam(user.teams);
        const id = this.defaultTeam.team.division.conference.league.id_league;

        this.freeAgents$ = this.leagueService.getFreeAgents(id);
        this.freeAgents$.subscribe(freeAgents => {
          if (freeAgents) {
            this.dataSource.data = freeAgents.slice().sort(sortPlayers);
          }
        });
      }
    });
  }

}
