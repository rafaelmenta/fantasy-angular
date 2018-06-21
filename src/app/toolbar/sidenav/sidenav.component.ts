import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  user: User;

  constructor(private userService: UserService) { }

  close() {
    this.sidenav.close();
  }

  ngOnInit() {
    this.userService.user.subscribe(next => this.user = next);
  }

}
