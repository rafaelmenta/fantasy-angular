import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { LeagueService } from '../../services/league/league.service';
import { TeamService } from '../../services/team.service';
import { Observable } from 'rxjs';
import { Draft } from '../../services/draft/draft.service';
import { map, filter, mergeMap } from 'rxjs/operators';
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
    this.drafts$ = this.userService.user.pipe(
      filter(user => user !== undefined),
      map(user => this.teamService.getDefaultTeam(user.teams)),
      mergeMap(team => this.leagueService.getDrafts(team.team.division.conference.league.id_league)),
      map(draft => ({
        previous_drafts: draft.previous_drafts.sort((a, b) => compare(a.year_draft, b.year_draft, false)),
        next_drafts: draft.next_drafts.sort((a, b) => compare(a.year_draft, b.year_draft, true)),
      }))
    );
  }

}
