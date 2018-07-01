import { Injectable, Inject } from '@angular/core';
import { Team } from './team.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { APP_CONFIG, AppConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { share, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UpdateTeam, UPDATE_TEAM } from '../store/user-team.reducer';
import { UpdateFreeAgents, UPDATE_FREE_AGENTS } from '../store/free-agents.reducer';
import { UpdateLeague, UPDATE_LEAGUE } from '../store/league.reducer';
import { UpdateFreeAgencyHistory, UPDATE_FREE_AGENCY_HISTORY } from '../store/free-agents-history.reducer';
import { UpdateTradeHistory, UPDATE_TRADE_HISTORY } from '../store/trade-history.reducer';
import { UpdateTrade, UPDATE_TRADE } from '../store/trade.reducer';
import { Player } from './player/player.service';
import { League } from '../../typings';

export interface UserTeam {
  id_sl: number;
  default_team: boolean;
  team: {
    city: string;
    nickname: string;
    slug: string;
    division: { conference: { league: { id_league: number; } } }
  };
}

export interface User {
  id_user: number;
  login: string;
  nickname: string;
  teams?: UserTeam[];
  token: string;
}

interface UserState {
  freeAgents: Player[];
  userTeam: Team;
  league: League;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private resource = 'users';

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

  clearCache() {
    this.store.dispatch<UpdateTeam>({ type: UPDATE_TEAM, payload: undefined });
    this.store.dispatch<UpdateFreeAgents>({ type: UPDATE_FREE_AGENTS, payload: undefined });
    this.store.dispatch<UpdateLeague>({ type: UPDATE_LEAGUE, payload: undefined });
    this.store.dispatch<UpdateFreeAgencyHistory>({ type: UPDATE_FREE_AGENCY_HISTORY, payload: undefined });
    this.store.dispatch<UpdateTradeHistory>({ type: UPDATE_TRADE_HISTORY, payload: undefined });
    this.store.dispatch<UpdateTrade>({ type: UPDATE_TRADE, payload: undefined });
  }

  changeDefaultTeam(userTeam: UserTeam) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/default-team`;
    const body = { id_sl: userTeam.id_sl };

    return this.http.post<{updateDefaultTeam: number[]}>(url, body).pipe(
      share(),
      tap(res => {
        if (res.updateDefaultTeam[0] > 0) {
          const user = this.userSubject.getValue();
          user.teams.forEach(team => team.default_team = team.id_sl === userTeam.id_sl);
          this.clearCache();
          this.setUser(user);
        }
      })
    );
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private store: Store<UserState>,
    private jwtHelperService: JwtHelperService) {
    this.loadUser();
  }
}
