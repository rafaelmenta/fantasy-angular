import { Component, OnInit, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Team, TeamService } from '../../services/team.service';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { ClubhouseService } from '../../services/clubhouse/clubhouse.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.css']
})
export class TeamOverviewComponent implements OnInit {

  @Input() id: number;
  team$: Observable<Team>;

  constructor(private clubhouse: ClubhouseService) {}

  ngOnInit() {
    this.team$ = this.clubhouse.team;
  }

}
