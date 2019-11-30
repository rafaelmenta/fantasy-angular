import { Component, OnInit, Input } from '@angular/core';
import { Observable, of, concat } from 'rxjs';
import { AdminUser } from '../../service/user/admin-user';
import { AdminUserService } from '../../service/user/admin-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, takeWhile } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit {

  @Input() login: string;

  user$: Observable<AdminUser>;

  passwordCheck: string;

  constructor(
    private readonly user: AdminUserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar,
  ) { }

  back() {
    this.router.navigate(['admin', 'user']);
  }

  save(user: AdminUser) {
    this.user.save(user).subscribe(res => {

      if (res.addUser || res.updateUser) {
        this.snackbar.open('Usuário salvo', null, {duration: 3000});
        this.back();
        return;
      }
      this.snackbar.open('Erro ao salvar', null, {duration: 3000});
    });
  }

  checkPassword(user: AdminUser) {
    return user.password !== this.passwordCheck;
  }

  ngOnInit() {
    const new$ = of({} as AdminUser);
    const existing$ = this.user$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('login')),
      takeWhile(login => !!login),
      mergeMap(login => this.user.getUser(login)),
    );

    this.user$ = concat(existing$, new$);
  }

}
