import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../../../app.config';
import { map, share } from 'rxjs/operators';
import { AdminUser } from './admin-user';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  getUsers() {
    const url = `${this.config.API_ENDPOINT}users`;
    return this.http.get<{ users: AdminUser[] }>(url).pipe(
      map(res => res.users),
      share(),
    );
  }

  getUser(login: string) {
    const url = `${this.config.API_ENDPOINT}users/${login}`;
    return this.http.get<{ user: AdminUser}>(url).pipe(
      map(res => res.user),
      share(),
    );
  }

  save(user: AdminUser) {
    const url = `${this.config.API_ENDPOINT}users/save`;
    return this.http.post<{updateUser?: number[]; addUser?: {id_user: number}}>(url, {user}).pipe(
      share(),
    );
  }

  delete(login: string) {
    const url = `${this.config.API_ENDPOINT}users/${login}`;
    return this.http.delete<{deleteUser: number[]}>(url).pipe(
      share(),
    );
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient,
  ) {}
}
