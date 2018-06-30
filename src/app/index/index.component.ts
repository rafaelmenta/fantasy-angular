import { Component, OnInit } from '@angular/core';
import { User, UserService, UserTeam } from '../services/user.service';
import { Team } from '../services/team.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public user: User;
  public team: UserTeam;

  getDefaultTeam(teams: UserTeam[]) {
    return teams.find(team => team.default_team);
  }

  constructor(userService: UserService, private title: Title) {
    userService.user.subscribe(user => {
      this.user = user;

      if (user && user.teams) {
        this.team = this.getDefaultTeam(user.teams);
      }
    });
  }

  ngOnInit() {
    this.title.setTitle('Fantasy Superliga');
  }

}
