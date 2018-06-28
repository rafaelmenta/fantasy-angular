import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LeagueService } from '../../services/league/league.service';
import { TeamService } from '../../services/team.service';
import { Observable } from 'rxjs';
import { DraftOverview, DraftStatus, DraftType, DraftService } from '../../services/draft/draft.service';
import { map } from 'rxjs/operators';
import { Pick } from '../../services/pick/pick.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {

  draft$: Observable<DraftOverview>;
  draft: DraftOverview;

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private draftService: DraftService,
    private leagueService: LeagueService,
    private route: ActivatedRoute,
    private title: Title,
  ) { }

  getStatus(status: DraftStatus) {
    if (status === DraftStatus.STATUS_OPEN) {
      return 'Aberto';
    } else if (status === DraftStatus.STATUS_FINISHED) {
      return 'Finalizado';
    }
    return 'Fechado';
  }

  getDraftType(status: DraftType) {
    if (status === DraftType.ROOKIES) {
      return 'Calouros';
    }
    return 'Geral';
  }

  isOpen(status: DraftStatus) {
    return status === DraftStatus.STATUS_OPEN;
  }

  getStartDate(picks: Pick[]) {
    return picks.reduce((minDate: Date, pick: Pick) => {
      const validDate = Date.parse(pick.deadline);
      if (isNaN(validDate)) {
        return minDate;
      }

      const date = new Date(pick.deadline);
      if (!minDate) {
        return date;
      }

      if (minDate < date) {
        return minDate;
      }

      return date;
    }, null);
  }

  getEndDate(picks: Pick[]) {
    return picks.reduce((maxDate: Date, pick: Pick) => {
      const validDate = Date.parse(pick.deadline);
      if (isNaN(validDate)) {
        return maxDate;
      }

      const date = new Date(pick.deadline);
      if (!maxDate) {
        return date;
      }

      if (maxDate > date) {
        return maxDate;
      }

      return date;
    }, null);
  }

  refreshPicks() {
    this.draft$.subscribe(res => {
      this.title.setTitle(`Superliga - Draft ${res.year_draft}`);
      this.draft = res;
    });
  }

  ngOnInit() {
    this.title.setTitle('Superliga - Draft');

    let draftId;
    this.route.paramMap.subscribe(paramMap => {
      draftId = paramMap.get('id');
      this.draft$ = this.draftService.getDraftOverview(draftId);
      this.refreshPicks();
    });

    if (!draftId) {
      this.userService.user.subscribe(user => {
        if (user) {
          const team = this.teamService.getDefaultTeam(user.teams);
          const id = team.team.division.conference.league.id_league;

          this.draft$ = this.leagueService.getRecentDraft(id).pipe(map(res => {
            if (res === null) {
              return {} as DraftOverview;
            }
            return res;
          }));
        }
      });
    }

    if (this.draft$) {
      this.refreshPicks();
    }
  }

}
