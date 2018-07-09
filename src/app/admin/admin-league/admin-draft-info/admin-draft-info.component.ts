import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AdminDraft, AdminPick, BaseAdminDraft } from '../../service/draft/admin-draft';
import { compare } from '../../../../lib/utils';
import * as moment from 'moment';
import { AdminDraftService } from '../../service/draft/admin-draft.service';
import { MatSnackBar } from '@angular/material';
import { AdminTeam } from '../../service/team/admin-team';


@Component({
  selector: 'app-admin-draft-info',
  templateUrl: './admin-draft-info.component.html',
  styleUrls: ['./admin-draft-info.component.css']
})
export class AdminDraftInfoComponent implements OnChanges {

  @Input() draft: AdminDraft;
  @Input() teams: AdminTeam[];
  @Output() deleteRound = new EventEmitter<{draft: AdminDraft; round: number}>();

  groups: { round: string; picks: AdminPick[]; }[];
  round: number;

  displayedColumns = ['order', 'owner', 'original', 'date', 'time', 'action'];

  constructor(private draftService: AdminDraftService, private snackbar: MatSnackBar) { }

  get validRound() {
    return this.round && this.round > 0;
  }

  groupByRound(picks: AdminPick[]) {
    const groupMap = picks.reduce((groups, pick: AdminPick) => {
      const groupPicks = groups[pick.round];

      if (groupPicks) {
        groupPicks.push(pick);
      } else {
        groups[pick.round] = [pick];
      }

      return groups;
    }, {});
    return Object.keys(groupMap).map(round => {
      return { round, picks: groupMap[round].sort((a, b) => compare(a.order, b.order, true)) };
    });
  }

  getPickOutput(pick: AdminPick) {
    if (this.validDate(pick.deadline)) {
      const pickDate = new Date(pick.deadline);
      moment.locale('pt-br');
      return moment(pickDate).format('LLL');
    }
    return 'Deadline não definida';
  }

  onStatusChange($event: AdminDraft) {
    const draft = {
      id_draft: $event.id_draft,
      status_draft: $event.status_draft,
    } as BaseAdminDraft;

    this.draftService.updateDraft(draft).subscribe(res => {
      if (res.updateDraftStatus) {
        this.snackbar.open('Status atualizado', null, {duration: 3000});
      }
    });
  }

  onCreate(round: number) {
    this.draftService.createRound(this.draft, round).subscribe(res => {
      if (res.createRound) {
        this.draft.picks = [...res.createRound, ...this.draft.picks];
        this.ngOnChanges();
        this.snackbar.open('Picks criadas', null, {duration: 3000});
      }
    });
  }

  onSavePick(pick: AdminPick) {
    if (pick.date && pick.time) {
      moment.locale('pt-br');
      const time = moment(pick.time, 'H:mm');
      const date = moment(pick.date);
      date.set('h', time.get('h'));
      date.set('m', time.get('m'));
      pick.deadline = date.format('YYYY-MM-DD H:mm:ss');
    }
    this.draftService.savePick(pick).subscribe(res => {
      if (res.savePick) {
        this.snackbar.open('Pick atualizada', null, {duration: 3000});
      }
    });
  }

  onDeleteRound(draft: AdminDraft, round: string) {
    const roundInt = parseInt(round, 10);
    this.draftService.deleteRound(draft, roundInt).subscribe(res => {
      if (res.deleteRound) {
        this.draft.picks = this.draft.picks.filter(pick => pick.round !== roundInt);
        this.ngOnChanges();
        this.snackbar.open(`${res.deleteRound} picks removidas`, null, {duration: 3000});
      }
    });
  }

  validDate(date: string) {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate);
  }

  ngOnChanges() {
    this.draft.picks.forEach(pick => {
      if (this.validDate(pick.deadline)) {
        const date = new Date(pick.deadline);
        moment.locale('pt-br');
        pick.time = moment(date).format('HH:mm');
        pick.date = moment(date).toISOString();
      }
    });
    this.groups = this.groupByRound(this.draft.picks);
  }

}
