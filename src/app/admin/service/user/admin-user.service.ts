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
      share()
    );
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) { }
}
