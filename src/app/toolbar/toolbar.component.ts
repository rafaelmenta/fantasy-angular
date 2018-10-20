import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserService, User, UserPermission } from '../services/user.service';
import { MatSidenav } from '@angular/material';
import { TeamService } from '../services/team.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamTrades } from '../services/trade/trade.service';
import { Store, select } from '@ngrx/store';
import { UpdateTrade, UPDATE_TRADE } from '../store/trade.reducer';
import { Router } from '@angular/router';

interface TradeState {
  trades: TeamTrades;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  @ViewChild('searchOpen') searchOpen: boolean;
  @Input('sidenav') sidenav: MatSidenav;

  user: User;
  trades$: Observable<TeamTrades>;

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private router: Router,
    private store: Store<TradeState>,
  ) {
    this.trades$ = this.store.pipe(select('trades'));
  }

  loadTrade() {
    this.router.navigateByUrl('trade/received');
  }

  canSeeAdmin(user: User) {
    return [
      UserPermission.ADMIN,
      UserPermission.COMMISSIONER,
      UserPermission.UPDATER,
    ].includes(user.id_permission);
  }

  onUserChange(user: User) {
    this.user = user;
    if (user) {
      const team = this.teamService.getDefaultTeam(user.teams);

      this.teamService.getTrades(team.id_sl).subscribe(teamTrades => {
        this.store.dispatch<UpdateTrade>({ type: UPDATE_TRADE, payload: { teamTrades } });
      });
    }
  }

  ngOnInit() {
    this.userService.user.subscribe(this.onUserChange.bind(this));
  }

}
