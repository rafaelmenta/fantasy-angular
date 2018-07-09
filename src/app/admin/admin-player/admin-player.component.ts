import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
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

  ngOnInit() {
    this.players$ = this.getSortedPlayers();
    this.nbaTeams$ = this.system.nbaTeams$;
  }

  constructor(
    private player: AdminPlayerService,
    private system: SystemService,
  ) { }

}
