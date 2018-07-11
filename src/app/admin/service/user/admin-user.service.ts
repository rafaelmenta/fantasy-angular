import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig, APP_CONFIG } from '../../../app.config';
import { map, share } from 'rxjs/operators';
import { AdminUser } from './admin-user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  private userSubject = new ReplaySubject<AdminUser[]>(1);
  private users$ = this.userSubject.asObservable();

  loadUsers() {
    const url = `${this.config.API_ENDPOINT}users`;
    return this.http.get<{ users: AdminUser[] }>(url).pipe(
      map(res => res.users),
      share()
    );
  }

  getUsers() {
    return this.users$;
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    this.loadUsers().subscribe(users => this.userSubject.next(users));
  }
}
