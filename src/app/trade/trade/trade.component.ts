import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { TeamTrades } from '../../services/trade/trade.service';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddSentTrade, UpdateTrade, UPDATE_TRADE } from '../../store/trade.reducer';
import { Title } from '@angular/platform-browser';

interface TradeState {
  trades: TeamTrades;
}

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {

  trades: Observable<TeamTrades>;

  constructor(
    private store: Store<TradeState>,
    private userService: UserService,
    private title: Title,
    private teamService: TeamService) {
      this.trades = store.pipe(select('trades'));
    }

  ngOnInit() {
    this.title.setTitle(`Superliga - Trocas`);
    this.userService.user.subscribe(user => {
      if (user) {
        const team = this.teamService.getDefaultTeam(user.teams);
        this.teamService.getTrades(team.id_sl).subscribe(teamTrades => {
          this.store.dispatch<UpdateTrade>({type: UPDATE_TRADE, payload: { teamTrades}});
        });
      }
    });
  }
}
