import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AdminPlayer, BasePlayer } from '../service/player/admin-player';
import { AdminPlayerService } from '../service/player/admin-player.service';
import { BaseAdminNBATeam } from '../service/system/system';
import { SystemService } from '../service/system/system.service';
import { map, filter } from 'rxjs/operators';
import { sortPlayers } from '../../../lib/utils';
import { MatInput } from '@angular/material';

@Component({
  selector: 'app-admin-player',
  templateUrl: './admin-player.component.html',
  styleUrls: ['./admin-player.component.css']
})
export class AdminPlayerComponent implements OnInit {

  players$: Observable<BasePlayer[]>;
  player$: Observable<AdminPlayer>;
  nbaTeams$: Observable<BaseAdminNBATeam[]>;

  loadPlayer(player: BasePlayer) {
    this.player$ = this.player.getPlayer(player.player_slug);
  }

  getSortedPlayers() {
    return this.player.players$.pipe(map(players => players.sort(sortPlayers)));
  }

  isValidPlayer(player: BasePlayer, term: string, id: number) {
    if (!term && !id) {
      return true;
    }
    const name = `${player.first_name} ${player.last_name}`.toLocaleLowerCase();

    let validNba = true;
    if (id) {
      validNba = player.id_nba === id;
    }

    let validName = true;
    if (term) {
      validName = name.indexOf(term.toLocaleLowerCase()) > -1;
    }

    return validNba && validName;
  }

  onSearchChange(search) {
    this.players$ = this.getSortedPlayers().pipe(map(players => {
      return players.filter(player => this.isValidPlayer(player, search.value, search.id_nba));
    }));
  }

  onSave(players: BasePlayer[], $event: {type: 'add'|'update'|'remove', player: AdminPlayer}) {
    if ($event.type === 'add') {
      players.unshift($event.player);
    } else if ($event.type === 'update') {
      players.forEach(player => {
        if (player.id_player === $event.player.id_player) {
          player.first_name = $event.player.first_name;
          player.last_name = $event.player.last_name;
          player.player_slug = $event.player.player_slug;
          player.id_nba = $event.player.id_nba;
        }
      });
    } else {
      const index = players.findIndex(player => player.id_player === $event.player.id_player);
      players.splice(index, 1);
      this.player$ = null;
    }
  }

  onCreateClick() {
    const newPlayer = new BehaviorSubject<AdminPlayer>({player_slug: ''} as AdminPlayer);
    this.player$ = newPlayer.asObservable();
  }

  ngOnInit() {
    this.players$ = this.getSortedPlayers();
    this.nbaTeams$ = this.system.nbaTeams$;
  }

  constructor(
    private player: AdminPlayerService,
    private system: SystemService,
  ) { }

}
