import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League, Conference, FreeAgencyHistory } from 'typings';
import { Team } from '../team.service';
import { Store, select } from '@ngrx/store';
import { tap, map, share } from 'rxjs/operators';
import { UPDATE_LEAGUE } from '../../store/league.reducer';
import { Player } from '../player/player.service';
import { UPDATE_FREE_AGENTS, REMOVE_FREE_AGENT, RemoveFreeAgent } from '../../store/free-agents.reducer';
import { ADD_TEAM_PLAYER, AddTeamPlayer } from '../../store/user-team.reducer';
import { UPDATE_FREE_AGENCY_HISTORY } from '../../store/free-agents-history.reducer';
import { Angulartics2 } from 'angulartics2';

interface LeagueState {
  league: League;
  freeAgents: Player[];
  freeAgencyHistory: FreeAgencyHistory[];
}

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private resource = 'leagues';
  private userLeague: Observable<League>;
  private freeAgents: Observable<Player[]>;
  private freeAgencyHistory: Observable<FreeAgencyHistory[]>;

  getTeams(leagueId: number): Observable<League>  {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${leagueId}/teams`;
    return this.http.get<{league: League}>(url).pipe(map(res => res.league));
  }

  getUserLeague(id: number) {
    let userLeague: League;
    this.userLeague.subscribe(league => userLeague = league);

    if (!userLeague) {
      this.getTeams(id).subscribe(payload => this.store.dispatch({type: UPDATE_LEAGUE, payload}));
    }

    return this.userLeague;
  }

  private loadFreeAgents(id: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/free-agents`;
    const res = this.http.get<{ league: League }>(url);

    res.subscribe(response => this.store.dispatch({
      type: UPDATE_FREE_AGENTS,
      payload: response.league.free_agents,
    }));
  }

  private loadFreeAgencyHistory(id: number) {
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/free-agents/history`;
    const res = this.http.get<{ league: { free_agency_history: FreeAgencyHistory[]} }>(url)
      .pipe(share());

    res.subscribe(response => this.store.dispatch({
      type: UPDATE_FREE_AGENCY_HISTORY,
      payload: response.league.free_agency_history,
    }));
  }

  getFreeAgents(id: number) {
    let fa;
    this.freeAgents.subscribe(freeAgents => fa = freeAgents);

    if (!fa) {
      this.loadFreeAgents(id);
    }
    return this.freeAgents;
  }

  getFreeAgentsHistory(id: number) {
    let fa;
    this.freeAgencyHistory.subscribe(freeAgencyHistory => fa = freeAgencyHistory);

    if (!fa) {
      this.loadFreeAgencyHistory(id);
    }

    return this.freeAgencyHistory;
  }

  getSearch(id: number, query: string) {
    this.angulartics2.eventTrack.next({
      action: 'type-search',
      properties: {
        category: 'search',
        label: query,
      }
    });
    const url = `${this.config.API_ENDPOINT}${this.resource}/${id}/search/${query}`;
    return this.http.get<{search_players: Player[], search_teams: Array<Team['team']>}>(url).pipe(share());
  }

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private store: Store<LeagueState>,
    protected http: HttpClient,
    private angulartics2: Angulartics2,
  ) {
    this.userLeague = this.store.pipe(select('league'));
    this.freeAgents = this.store.pipe(select('freeAgents'));
    this.freeAgencyHistory = this.store.pipe(select('freeAgencyHistory'));
  }
}
