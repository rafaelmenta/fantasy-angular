import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Player } from '../services/player/player.service';
import { Team } from '../services/team.service';
import { UpdateTeam, UPDATE_TEAM } from '../store/user-team.reducer';
import { UpdateFreeAgents, UPDATE_FREE_AGENTS } from '../store/free-agents.reducer';
import { UpdateLeague, UPDATE_LEAGUE } from '../store/league.reducer';
import { Angulartics2 } from 'angulartics2';
import { League } from '../../typings';

interface LogoutState {
  freeAgents: Player[];
  userTeam: Team;
  league: League;
}

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private userService: UserService,
    private store: Store<LogoutState>,
    private angulartics2: Angulartics2,
    private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('token');
    this.store.dispatch<UpdateTeam>({type: UPDATE_TEAM, payload: undefined});
    this.store.dispatch<UpdateFreeAgents>({type: UPDATE_FREE_AGENTS, payload: undefined});
    this.store.dispatch<UpdateLeague>({type: UPDATE_LEAGUE, payload: undefined});
    this.userService.setUser(null);
    this.angulartics2.eventTrack.next({
      action: 'click-logout',
      properties: {
        category: 'authentication',
      }
    });

    this.router.navigate(['']);
  }

}
