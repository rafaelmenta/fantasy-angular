import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserTeam, UserService, User } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-team-picker',
  templateUrl: './team-picker.component.html',
  styleUrls: ['./team-picker.component.css']
})
export class TeamPickerComponent implements OnInit {

  teams: UserTeam[];
  defaultTeam: UserTeam;

  constructor(
    private userService: UserService,
    private angulartics: Angulartics2,
    private teamService: TeamService) { }

  selectTeam(team: UserTeam) {
    this.userService.changeDefaultTeam(team).subscribe(() => {
      this.angulartics.eventTrack.next({
        action: 'change-default',
        properties: {
          category: 'user',
        }
      });
    });
  }

  ngOnInit() {
    this.userService.user.subscribe(user => {
      if (user) {
        this.teams = user.teams;
        this.defaultTeam = this.teamService.getDefaultTeam(user.teams);
      }
    });
  }

}
