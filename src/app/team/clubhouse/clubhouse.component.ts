import { Component, OnInit, ViewChild, Input, Inject, OnChanges } from '@angular/core';
import { MatSort, MatTableDataSource, MatTab } from '@angular/material';
import { Team, TeamService } from '../../services/team.service';
import { Player } from '../../services/player/player.service';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map, mergeMap, filter, tap } from 'rxjs/operators';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { ClubhouseService } from '../../services/clubhouse/clubhouse.service';

@Component({
  selector: 'app-clubhouse',
  templateUrl: './clubhouse.component.html',
  styleUrls: ['./clubhouse.component.css']
})
export class ClubhouseComponent implements OnInit {
  @Input() id: number;
  team$: Observable<Team>;
  layoutChanges: Observable<BreakpointState>;
  isSmallScreen$: Observable<boolean>;

  loadTeam(id: number|string, useCache: boolean) {
    return this.teamService.getTeam(id, useCache).pipe(
      tap(team => {
        if (team) {
          this.clubhouse.teamSubject.next(team);
          const title = `Superliga - ${team.team_overview.city} ${team.team_overview.nickname}`;
          this.title.setTitle(title);
        }
      })
    );
  }

  ngOnInit() {
    this.layoutChanges = this.breakpointObserver.observe(this.config.LARGE_MOBILE_QUERY);
    this.isSmallScreen$ = this.layoutChanges.pipe(map(res => res.matches));

    this.title.setTitle(`Superliga - Equipe`);

    this.team$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      mergeMap(id => this.getTeam(id))
    );
  }

  private getTeam(id?: string) {
    if (id) {
      return this.loadTeam(id, false);
    }

    return this.getUserTeam();
  }

  private getUserTeam() {
    return this.userService.user.pipe(
      filter(user => user !== undefined),
      map(user => this.teamService.getDefaultTeam(user.teams)),
      mergeMap(team => this.loadTeam(team.id_sl, true)),
    );
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private teamService: TeamService,
    private userService: UserService,
    private clubhouse: ClubhouseService,
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute) { }
}
