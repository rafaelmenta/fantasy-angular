import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { UserService, User, UserPermission } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router, private user: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    let user: User;
    this.user.user.subscribe(next => user = next).unsubscribe();
    if (![UserPermission.ADMIN, UserPermission.COMMISSIONER].includes(user.id_permission)) {
      this.router.navigate(['not-allowed']);
      return false;
    }

    return true;
  }
}
