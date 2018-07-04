import { Component, OnInit } from '@angular/core';
import { ArchiveService, ArchiveTeamStat } from '../../services/archive/archive.service';
import { ClubhouseService } from '../../services/clubhouse/clubhouse.service';
import { Team, TeamService } from '../../services/team.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { tap, map } from 'rxjs/operators';
import { compare } from '../../../lib/utils';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team-history',
  templateUrl: './team-history.component.html',
  styleUrls: ['./team-history.component.css']
})
export class TeamHistoryComponent implements OnInit {

  history$: Observable<ArchiveTeamStat>;

  constructor(
    private archive: ArchiveService,
    private route: ActivatedRoute,
    private user: UserService,
    private team: TeamService,
    private clubhouse: ClubhouseService,
    private title: Title,
  ) { }

  onTeamChange(id: string|number) {
    this.history$ = this.archive.getTeamStatHistory(id);
  }

  ngOnInit() {
    this.clubhouse.team.subscribe(team => {
      this.title.setTitle(`Superliga - Histórico ${team.team_overview.city} ${team.team_overview.nickname}`);
    });

    this.route.parent.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      if (id) {
        this.onTeamChange(id);
      } else {
        this.user.user.subscribe(nextUser => {
          if (nextUser) {
            const team = this.team.getDefaultTeam(nextUser.teams);
            this.onTeamChange(team.id_sl);
          }
        });
      }
    });
  }

}
