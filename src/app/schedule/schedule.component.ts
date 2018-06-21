import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { TeamService, Team } from '../services/team.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  team: Team;

  constructor(
    private userService: UserService,
    private title: Title,
    private teamService: TeamService,
  ) { }

  ngOnInit() {
    this.title.setTitle(`Superliga - Calendário`);
    let user: User;
    const user$ = this.userService.user.subscribe(u => user = u);

    const defaultTeam = this.teamService.getDefaultTeam(user.teams);
    this.team = defaultTeam;
  }

}
