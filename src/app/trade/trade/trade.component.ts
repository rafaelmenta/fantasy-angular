import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { TeamTrades } from '../../services/trade/trade.service';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UpdateTrade, UPDATE_TRADE } from '../../store/trade.reducer';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap, tap, takeUntil } from 'rxjs/operators';

interface TradeState {
  trades: TeamTrades;
}

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit, OnDestroy {

  trades: Observable<TeamTrades>;

  private sub: Subscription;

  constructor(
    private store: Store<TradeState>,
    private userService: UserService,
    private title: Title,
    private teamService: TeamService) {
      this.trades = store.pipe(select('trades'));
    }

  ngOnInit() {
    this.title.setTitle(`Superliga - Trocas`);

    this.sub = this.userService.user.pipe(
      filter(user => user !== undefined),
      map(user => this.teamService.getDefaultTeam(user.teams)),
      mergeMap(team => this.teamService.getTrades(team.id_sl)),
      tap(teamTrades => this.store.dispatch<UpdateTrade>({type: UPDATE_TRADE, payload: {teamTrades}})),
    ).subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
