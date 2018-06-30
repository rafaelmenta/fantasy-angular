import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TeamService, Team } from '../../services/team.service';
import { Player } from '../../services/player/player.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DropPlayerComponent } from '../drop-player/drop-player.component';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {

  userTeam: Team;
  players: Player[];
  dirtyRoster: boolean;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private title: Title,
    private angulartics2: Angulartics2,
    private teamService: TeamService) { }

  getSortedPlayers(players: Player[]) {
    return players.sort((a, b) => {
      if (a.team_info.order < b.team_info.order) {
        return -1;
      }

      if (a.team_info.order > b.team_info.order) {
        return 1;

      }

      return 0;
    });
  }

  removePlayer(player: Player) {
    return this.teamService.removePlayer(this.userTeam, player);
  }

  swapPosition(player: Player) {
    this.teamService.swapPosition(this.userTeam.team_overview.id_sl, player.id_player).subscribe(res => {
      const swap = player.team_info.primary_position;
      player.team_info.primary_position = player.team_info.secondary_position;
      player.team_info.secondary_position = swap;
      this.angulartics2.eventTrack.next({
        action: 'swap-position',
        properties: {
          category: player.player_slug,
        }
      });
      this.snackbar.open('Posição atualizada', null, { duration: 3000 });
    });
  }

  saveRoster() {
    const roster = this.players.map(player => {
      return {
        id_player: player.id_player,
        id_sl: this.userTeam.team_overview.id_sl,
        order: player.team_info.order,
        primary_position: player.team_info.primary_position,
        secondary_position: player.team_info.secondary_position,
      };
    });
    this.teamService.saveRoster(this.userTeam.team_overview.id_sl, roster).subscribe(res => {
      this.dirtyRoster = false;
      this.angulartics2.eventTrack.next({
        action: 'update-roster',
        properties: {
          category: this.userTeam.team_overview.slug,
        }
      });
      this.snackbar.open('Roster atualizado', null, { duration: 3000 });
    });
  }

  openDropDialog($event: Player) {
    const dialogRef = this.dialog.open(DropPlayerComponent, {
      data: {player: $event},
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.removePlayer($event).subscribe(res => {
          this.angulartics2.eventTrack.next({
            action: 'drop-player',
            properties: {
              category: $event.player_slug,
            }
          });
          this.snackbar.open('Jogdor dispensado', null, {duration: 3000});
        });
      }
    });
  }

  updatePlayers($event: string, pivotPlayer: Player) {
    this.dirtyRoster = true;
    const affectedPlayer = this.players.find(player =>
      player.team_info.order === pivotPlayer.team_info.order &&
      player.id_player !== pivotPlayer.id_player);

    if (affectedPlayer) {
      if ($event === 'forward') {
        affectedPlayer.team_info.order -= 1;
      } else {
        affectedPlayer.team_info.order += 1;
      }

      this.players = this.getSortedPlayers(this.players);
    }
  }

  ngOnInit() {
    this.title.setTitle('Superliga - Roster');
    this.userService.user.subscribe(user => {
      if (user) {
        const defaultTeam = this.teamService.getDefaultTeam(user.teams);
        this.teamService.getTeam(defaultTeam.id_sl, true).subscribe(team => {
          if (team) {
            this.players = this.getSortedPlayers(team.team_overview.players);
            this.userTeam = team;
          }
        });
      }
    });

  }
}
