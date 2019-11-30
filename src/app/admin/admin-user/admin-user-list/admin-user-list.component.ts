import { Component, OnInit, Input } from '@angular/core';
import { AdminUser } from '../../service/user/admin-user';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { AdminUserService } from '../../service/user/admin-user.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  @Input() users: AdminUser[];

  displayedColumns = ['login', 'nickname', 'email', 'teams', 'remove'];
  dataSource = new MatTableDataSource<AdminUser>();

  constructor(
    private readonly user: AdminUserService,
    private readonly snackbar: MatSnackBar,
  ) { }

  remove(user: AdminUser) {
    this.user.delete(user.login).subscribe(res => {
      if (res.deleteUser) {
        this.snackbar.open('Usuário salvo', null, {duration: 3000});

        const data = this.dataSource.data;
        data.splice(this.dataSource.data.indexOf(user), 1);
        this.dataSource.data = data;
      }
    });
  }

  ngOnInit() {
    const users = this.users.sort((a, b) => a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1);
    this.dataSource.data = users;
  }

}
