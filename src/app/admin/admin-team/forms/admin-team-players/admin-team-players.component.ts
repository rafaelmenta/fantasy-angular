import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminTeamPlayer, AdminFreeAgent } from '../../../service/player/admin-player';

@Component({
  selector: 'app-admin-team-players',
  templateUrl: './admin-team-players.component.html',
  styleUrls: ['./admin-team-players.component.css']
})
export class AdminTeamPlayersComponent implements OnInit {

  @Input() players: AdminTeamPlayer[];
  @Input() freeAgents: AdminFreeAgent[];
  @Output() addPlayer = new EventEmitter<AdminFreeAgent>();
  @Output() removePlayer = new EventEmitter<AdminTeamPlayer>();

  selected: AdminFreeAgent;

  onAddPlayer(player: AdminFreeAgent) {
    this.addPlayer.emit(player);
    const teamPlayer: AdminTeamPlayer = {
      id_player: player.id_player,
      first_name: player.first_name,
      last_name: player.last_name,
      player_slug: player.player_slug,
      id_nba: player.id_nba,
      team_info: {
        primary_position: player.default_primary,
        secondary_position: player.default_secondary,
        order: this.players.length + 1,
      },
    };
    this.players.unshift(teamPlayer);
    this.selected = null;
    this.freeAgents = this.freeAgents.filter(fa => fa.id_player !== player.id_player);
  }

  onRemovePlayer(player: AdminTeamPlayer) {
    this.removePlayer.emit(player);
    this.players = this.players.filter(teamPlayer => teamPlayer.id_player !== player.id_player);
    const freeAgent: AdminFreeAgent = {
      id_player: player.id_player,
      first_name: player.first_name,
      last_name: player.last_name,
      player_slug: player.player_slug,
      id_nba: player.id_nba,
      default_primary: player.team_info.primary_position,
      default_secondary: player.team_info.secondary_position,
    };
    this.freeAgents.unshift(freeAgent);
  }

  constructor() { }

  ngOnInit() {
  }

}
