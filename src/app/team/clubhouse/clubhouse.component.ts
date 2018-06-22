import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatTab } from '@angular/material';
import { Team, TeamService } from '../../services/team.service';
import { Player } from '../../services/player/player.service';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { APP_CONFIG, AppConfig } from '../../app.config';

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

  loadTeam(id) {
    let user: User;
    this.userService.user.subscribe(u => user = u);

    let useCache = false;
    if (user) {
      const defaultTeam = this.teamService.getDefaultTeam(user.teams);
      if (this.id === defaultTeam.id_sl) {
        useCache = true;
      }
    }

    this.team$ = this.teamService.getTeam(id, useCache);
    this.team$.subscribe(team => {
      if (team) {
        const title = `Superliga - ${team.team.city} ${team.team.nickname}`;
        this.title.setTitle(title);
      }
    });
  }

  ngOnInit() {
    this.layoutChanges = this.breakpointObserver.observe(this.config.LARGE_MOBILE_QUERY);
    this.isSmallScreen$ = this.layoutChanges.pipe(map(res => res.matches));

    this.title.setTitle(`Superliga - Equipe`);

    if (this.id) {
      this.loadTeam(this.id);
    } else {
      this.route.paramMap.subscribe(paramMap => {
        const id = paramMap.get('id');
        if (id) {
          this.loadTeam(id);
        }
      });
    }
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private teamService: TeamService,
    private userService: UserService,
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute) { }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
