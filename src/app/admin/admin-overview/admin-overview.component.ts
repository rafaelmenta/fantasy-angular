import { Component, OnInit } from '@angular/core';
import { UserService, User, UserPermission } from '../../services/user.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.css']
})
export class AdminOverviewComponent implements OnInit {

  constructor(private userService: UserService) { }

  private visibility = {
    [UserPermission.ADMIN]: ['league', 'team', 'user', 'god'],
    [UserPermission.COMMISSIONER]: ['league', 'team', 'user'],
    [UserPermission.UPDATER]: [],
  };

  ngOnInit() {
    this.userService.user.subscribe(nextUser => {
      if (nextUser) {
        // console.warn('user', nextUser);
      }
    });
  }

  canSee(route: string) {
    let user: User;
    this.userService.user.subscribe(next => user = next).unsubscribe();
    const routes = this.visibility[user.id_permission] as string[];
    return routes.includes(route);
  }

}
