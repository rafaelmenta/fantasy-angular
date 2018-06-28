import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LeagueService } from '../../services/league/league.service';
import { TeamService } from '../../services/team.service';
import { Observable } from 'rxjs';
import { Draft } from '../../services/draft/draft.service';
import { map } from 'rxjs/operators';
import { compare } from '../../../lib/utils';

@Component({
  selector: 'app-draft-list',
  templateUrl: './draft-list.component.html',
  styleUrls: ['./draft-list.component.css']
})
export class DraftListComponent implements OnInit {

  drafts$: Observable<{previous_drafts: Draft[], next_drafts: Draft[]}>;

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private leagueService: LeagueService
  ) { }

  sortDraft() {
    // this.drafts$;
  }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      if (user) {
        const team = this.teamService.getDefaultTeam(user.teams);
        const id = team.team.division.conference.league.id_league;
        this.drafts$ = this.leagueService.getDrafts(id).pipe(map(draft => {
          return {
            previous_drafts: draft.previous_drafts.sort((a, b) => compare(a.year_draft, b.year_draft, false)),
            next_drafts: draft.next_drafts.sort((a, b) => compare(a.year_draft, b.year_draft, true)),
          };
        }));
        // this.sortDraft();
      }
    });
  }

}
