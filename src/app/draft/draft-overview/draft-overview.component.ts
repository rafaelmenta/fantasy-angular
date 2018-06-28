import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Pick } from '../../services/pick/pick.service';
import { group } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import { compare } from '../../../lib/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-draft-overview',
  templateUrl: './draft-overview.component.html',
  styleUrls: ['./draft-overview.component.css']
})
export class DraftOverviewComponent implements OnChanges {

  @Input() picks: Pick[];

  groups: {
    round: string;
    picks: Pick[];
  }[];

  displayedColumns = ['order', 'owner', 'deadline'];

  constructor() { }

  validDate(date: string) {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate);
  }

  groupByRound(picks: Pick[]) {
    const groupMap = picks.reduce((groups, pick: Pick) => {
      const groupPicks = groups[pick.round];

      if (groupPicks) {
        groupPicks.push(pick);
      } else {
        groups[pick.round] = [pick];
      }

      return groups;
    }, {});
    return Object.keys(groupMap).map(round => {
      return {round, picks: groupMap[round].sort((a, b) => compare(a.order, b.order, true))};
    });
  }

  getPickOutput(pick: Pick) {
    if (this.validDate(pick.deadline)) {
      const pickDate = new Date(pick.deadline);
      const today = new Date();

      if (pickDate < today) {
        return 'Skip';
      }
      moment.locale('pt-br');
      return moment(pickDate).format('LLL');
    }
    return 'Deadline não definida';
  }

  ngOnChanges() {
    if (this.picks) {
      this.groups = this.groupByRound(this.picks);
    }
  }

}
