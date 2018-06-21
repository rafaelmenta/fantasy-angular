import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('searchOpen') searchOpen: boolean;
  @Input('sidenav') sidenav: MatSidenav;

  user: User;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.user.subscribe(next => this.user = next);
  }

}
