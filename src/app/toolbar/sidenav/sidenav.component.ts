import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService, User } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  user$: Observable<User>;

  constructor(private userService: UserService) { }

  close() {
    this.sidenav.close();
  }

  ngOnInit() {
    this.user$ = this.userService.user;
  }

}
