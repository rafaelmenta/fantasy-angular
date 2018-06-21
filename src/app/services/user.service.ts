import { Injectable } from '@angular/core';
import { Team } from './team.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface User {
  id_user: number;
  login: string;
  nickname: string;
  teams?: Team[];
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  public readonly user: Observable<User> = this.userSubject.asObservable();

  setUser(user: User) {
    this.userSubject.next(user);
  }

  loadUser() {
    const token = localStorage.getItem('token');

    if (token) {
      const user = this.jwtHelperService.decodeToken(token);

      if (user && user.id_user) {
        this.setUser(user);
      }
    }
  }

  constructor(private jwtHelperService: JwtHelperService) {
    this.loadUser();
  }
}
