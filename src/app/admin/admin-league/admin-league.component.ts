import { Component, OnInit } from '@angular/core';
import { AdminLeague } from '../service/league/admin-league';
import { Observable, forkJoin } from 'rxjs';
import { AdminLeagueService } from '../service/league/admin-league.service';
import { MatSelectChange, MatSnackBar } from '@angular/material';
import { AdminGame } from '../service/game/admin-game';
import { AdminGameService } from '../service/game/admin-game.service';
import { SystemService } from '../service/system/system.service';
import { AdminRound, AdminSeason } from '../service/system/system';
import { map } from '../../../../node_modules/rxjs/operators';
import { flatTeams, sortAlphabetically } from '../../../lib/utils';
import { AdminTeam } from '../service/team/admin-team';
import { Conference } from '../../../typings';
import { BaseAdminDraft, AdminDraft } from '../service/draft/admin-draft';
import { AdminDraftService, AdminDraftType, AdminDraftStatus } from '../service/draft/admin-draft.service';

@Component({
  selector: 'app-admin-league',
  templateUrl: './admin-league.component.html',
  styleUrls: ['./admin-league.component.css']
})
export class AdminLeagueComponent implements OnInit {

  leagues$: Observable<AdminLeague[]>;
  combined$: Observable<[AdminLeague, AdminTeam[]]>;
  games$: Observable<AdminGame[]>;
  drafts$: Observable<BaseAdminDraft[]>;
  draft$: Observable<AdminDraft>;
  leagueNav: {};

  loadLeague(leagueRef: AdminLeague) {
    const league$ = this.league.getLeague(leagueRef.id_league);
    this.games$ = this.game.getLeagueGames(leagueRef.id_league);
    const teams$ = this.league.getLeagueTeams(leagueRef.id_league).pipe(
      map(league => flatTeams(league).sort(sortAlphabetically) as AdminTeam[]),
    );
    this.drafts$ = this.league.getLeagueDrafts(leagueRef.id_league);
    this.draft$ = null;
    this.combined$ = forkJoin(league$, teams$);
    this.leagueNav = {};
    this.leagueNav[leagueRef.id_league] = true;
  }

  onDraftCreation(id: number, $event: {id_type: AdminDraftType; season: AdminSeason}) {
    const year_draft = parseInt($event.season.year.split('/')[0], 10);
    const draft = {
      id_league: id,
      id_season: $event.season.id_season,
      year_draft,
      status_draft: AdminDraftStatus.STATUS_CLOSED,
      draft_type: $event.id_type,
    };

    this.draft.createDraft(draft).subscribe(res => {
      if (res.id_draft) {
        this.snackbar.open('Draft criado', null, {duration: 3000});
        this.league.getLeagueDrafts(id);
      }
    });
  }

  onDraftRemove(id: number, draft: BaseAdminDraft) {
    this.draft.removeDraft(draft).subscribe(res => {
      if (res.deleteDraft) {
        this.snackbar.open('Draft removido', null, { duration: 3000 });
        this.league.getLeagueDrafts(id);
      }
    });
  }

  onSelection($event: BaseAdminDraft) {
    this.draft$ = this.draft.getDraft($event.id_draft);
  }

  onSaveInfo(id: number, $event: AdminLeague) {
    this.league.saveLeague(id, $event).subscribe(res => {
      if (res.saveLeague) {
        this.snackbar.open('Informações salvas', null, {duration: 3000});
      }
    });
  }

  onSaveConference(id: number, $event: Conference) {
    this.league.saveConference(id, $event).subscribe(res => {
      if (res.saveConference) {
        this.snackbar.open('Conferência salva', null, { duration: 3000 });
      }
    });
  }

  onAddGame(id: number, $event: AdminGame) {
    this.game.createGame($event).subscribe(res => {
      if (res.createGame) {
        this.snackbar.open('Jogo criado', null, {duration: 3000});
        this.game.getLeagueGames(id);
      }
    });
  }

  onRemoveGame(id: number, $event: AdminGame) {
    this.game.deleteGame($event.id_game).subscribe(res => {
      if (res.deleteGame) {
        this.snackbar.open('Jogo removido', null, {duration: 3000});
        this.game.getLeagueGames(id);
      }
    });
  }

  ngOnInit() {
    this.leagueNav = {};
    this.leagues$ = this.league.getLeagues();
  }

  constructor(
    private league: AdminLeagueService,
    private snackbar: MatSnackBar,
    private draft: AdminDraftService,
    private game: AdminGameService) { }
}
