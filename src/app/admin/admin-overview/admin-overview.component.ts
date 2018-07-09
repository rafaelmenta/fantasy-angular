import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css']
})
export class AdminOverviewComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.user.subscribe(nextUser => {
      if (nextUser) {
        console.warn('user', nextUser);
      }
    });
  }

}
