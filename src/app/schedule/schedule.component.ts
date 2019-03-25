import { Component, OnInit } from '@angular/core';
import { UserService, UserTeam } from '../services/user.service';
import { TeamService } from '../services/team.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  team$: Observable<UserTeam>;

  constructor(
    private userService: UserService,
    private title: Title,
    private teamService: TeamService,
  ) { }

  ngOnInit() {
    this.title.setTitle(`Superliga - Calendário`);
    this.team$ = this.userService.user.pipe(
      filter(user => user !== undefined),
      map(user => this.teamService.getDefaultTeam(user.teams))
    );
  }
}
