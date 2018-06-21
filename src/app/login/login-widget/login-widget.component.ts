import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent {

  @Input() previousUrl: string;
  @Input() warn: boolean;
  @Input() register: boolean;

  login: string;
  password: string;
  loginFailed: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private angulartics2: Angulartics2,
  ) { }

  authUser() {
    this.loginFailed = false;
    this.authService.signin(this.login, this.password).subscribe((data: User) => {
      if (data.token) {
        this.angulartics2.eventTrack.next({
          action: 'login-successful',
          properties: {
            category: 'authentication',
          }
        });
        localStorage.setItem('token', data.token);
        this.userService.setUser(data);
        this.router.navigateByUrl(this.previousUrl);
      }
    }, err => {
      this.angulartics2.eventTrack.next({
        action: 'login-failed',
        properties: {
          category: 'authentication',
        }
      });

      this.loginFailed = true;
    });

    return false;
  }

}
