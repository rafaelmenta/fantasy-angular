import { Component, OnInit } from '@angular/core';
import { User, UserService, UserTeam } from '../services/user.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { filter, tap, take } from 'rxjs/operators';

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

  constructor(
    private userService: UserService,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Fantasy Superliga');

    this.userService.user.pipe(
      take(1),
      filter(user => user && user.teams !== undefined),
      tap(() => this.router.navigateByUrl('home', {skipLocationChange: true})),
    ).subscribe();
  }

}
