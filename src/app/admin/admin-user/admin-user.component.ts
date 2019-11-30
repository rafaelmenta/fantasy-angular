import { Component, OnInit } from '@angular/core';
import { AdminUserService } from '../service/user/admin-user.service';
import { AdminUser } from '../service/user/admin-user';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  users$: Observable<AdminUser[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly user: AdminUserService,
  ) { }

  ngOnInit() {
    this.users$ = this.user.getUsers();
  }

  newUser() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
