import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public jwtHelper: JwtHelperService,
    private httpClient: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) {}

  public signin(login: string, password: string) {
    const url = `${this.config.API_ENDPOINT}users/signin`;
    return this.httpClient.post(url, {login, password});
  }

  public isAuthenticated() {
    if (!localStorage) {
      throw new Error('Browser has no support to local storage.');
    }

    const token = localStorage.getItem('token');
    // TODO - Consider token expiration
    // return !this.jwtHelper.isTokenExpired(token);
    const data = this.jwtHelper.decodeToken(token);
    return data && data.id_user;
  }
}
