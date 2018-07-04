import { Component, OnInit } from '@angular/core';
import { User, UserService, UserTeam } from '../services/user.service';
import { Team } from '../services/team.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public user: User;

  getDefaultTeam(teams: UserTeam[]) {
    return teams.find(team => team.default_team);
  }

  constructor(private userService: UserService, private router: Router, private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('Fantasy Superliga');

    this.userService.user.subscribe(user => {
      this.user = user;

      if (user && user.teams) {
        this.router.navigateByUrl('home', { skipLocationChange: true });
      }
    });
  }

}
