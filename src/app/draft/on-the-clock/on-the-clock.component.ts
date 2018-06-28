import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Pick } from '../../services/pick/pick.service';
import { timer, Observable } from 'rxjs';
import { take, map, filter } from 'rxjs/operators';
import * as moment from 'moment';
import { UserService } from '../../services/user.service';
import { LeagueService } from '../../services/league/league.service';
import { TeamService } from '../../services/team.service';
import { DraftService, Draft, DraftOverview } from '../../services/draft/draft.service';
import { PlayerLookup, Player } from '../../services/player/player.service';
import { FormControl } from '@angular/forms';
import { sortPlayers } from '../../../lib/utils';
import { Angulartics2 } from 'angulartics2';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-on-the-clock',
  templateUrl: './on-the-clock.component.html',
  styleUrls: ['./on-the-clock.component.css']
})
export class OnTheClockComponent implements OnChanges {

  @Input() picks: Pick[];
  @Input() draft: DraftOverview;
  @Output() expired: EventEmitter<{pick: Pick}> = new EventEmitter();

  userTeamId: number;
  next: Pick;
  players$: Observable<PlayerLookup[]>;
  pickControl = new FormControl();

  countDown;
  count = 60;

  constructor(
    private userService: UserService,
    private draftService: DraftService,
    private teamService: TeamService,
    private angulartics2: Angulartics2,
    private snackbar: MatSnackBar,
  ) {}

  nextPickReducer(next: Pick, pick: Pick, idx) {
    const pickDate = new Date(pick.deadline);
    const today = new Date();

    if (pickDate < today) {
      return next;
    }

    if (pick.is_used) {
      return next;
    }

    if (!next) {
      return pick;
    }

    const nextDate = new Date(next.deadline);
    if (pickDate < nextDate) {
      return pick;
    }

    return next;
  }

  humanizeDuration() {
    this.count -= 1000;

    const date = new Date(this.next.deadline);
    const diff = moment(date).diff(moment());

    const days = moment.duration(diff).days();
    const hours = moment.duration(diff).hours();
    const minutes = moment.duration(diff).minutes();
    const seconds = moment.duration(diff).seconds();

    if (this.count < 0) {
      this.ngOnChanges();
      this.expired.emit({pick: this.next});
      return;
    }

    return `${days} dias ${hours} horas ${minutes} minutos ${seconds} segundos`;

  }

  ngOnChanges() {
    this.next = this.picks.reduce(this.nextPickReducer, null);

    if (this.next) {
      const date = new Date(this.next.deadline);
      this.count = moment(date).diff(moment());

      this.countDown = timer(0, 1000).pipe(
        take(this.count),
        map(this.humanizeDuration.bind(this))
      );

      this.userService.user.subscribe(user => {
        if (user) {
          const team = this.teamService.getDefaultTeam(user.teams);
          this.userTeamId = team.id_sl;

          if (this.userTeamId === this.next.owner.id_sl) {
            this.players$ = this.draftService.getAvailablePlayers(this.draft.id_draft).pipe(
              map(list => list.sort((a, b) => sortPlayers(a as Player, b as Player))));
          }
        }
      });
    }
  }

  draftPlayer(player: PlayerLookup) {
    this.draftService.draftPlayer(this.draft.id_draft, {
      id_player: player.id_player,
      id_sl: this.userTeamId,
      id_pick: this.next.id_pick,
      id_league: this.draft.id_league,
    }).subscribe(res => {
      if (res.draftPlayer.id_player) {
        this.angulartics2.eventTrack.next({
          action: 'draft-player',
          properties: {
            category: player.player_slug,
          }
        });

        this.snackbar.open('Jogador draftado', null, { duration: 3000 });
        this.expired.emit({pick: this.next});
      }
    });
  }

}
