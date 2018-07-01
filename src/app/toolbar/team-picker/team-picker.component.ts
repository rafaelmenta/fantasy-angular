import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserTeam, UserService, User } from '../../services/user.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-team-picker',
  templateUrl: './team-picker.component.html',
  styleUrls: ['./team-picker.component.css']
})
export class TeamPickerComponent implements OnInit {

  teams: UserTeam[];
  defaultTeam: UserTeam;

  constructor(private userService: UserService, private teamService: TeamService) { }

  selectTeam(team: UserTeam) {
    this.userService.changeDefaultTeam(team).subscribe();
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
