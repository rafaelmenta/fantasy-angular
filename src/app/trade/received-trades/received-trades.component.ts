import { Component, OnInit } from '@angular/core';
import { UserService, UserTeam } from '../../services/user.service';
import { TeamService, Team } from '../../services/team.service';
import { ReceivedTrade, Trade, TradeService, TeamTrades } from '../../services/trade/trade.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Player } from '../../services/player/player.service';
import { AcceptTradeComponent } from '../accept-trade/accept-trade.component';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';
import { UPDATE_TRADE, UpdateTrade } from '../../store/trade.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-received-trades',
  templateUrl: './received-trades.component.html',
  styleUrls: ['./received-trades.component.css']
})
export class ReceivedTradesComponent implements OnInit {

  team: UserTeam;
  trades: ReceivedTrade[];

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private tradeService: TradeService,
    private snackbar: MatSnackBar,
    private title: Title,
    private angulartics2: Angulartics2,
    private store: Store<{trades: TeamTrades}>,
    private dialog: MatDialog,
  ) {}

  revokeTrade(trade: Trade) {
    this.tradeService.cancelTrade(trade.id_trade, 'received').subscribe((res: any) => {
      if (res.removeTrade) {
        this.trades = this.trades.filter(sentTrade => trade.id_trade !== sentTrade.id_trade);
        this.angulartics2.eventTrack.next({
          action: 'revoke-trade',
          properties: {
            category: this.team.team.slug,
          }
        });
        this.snackbar.open('Troca recusada', null, { duration: 5000 });
      }
    });
  }

  openTradeDialog($event: Trade) {
    const dialogRef = this.dialog.open(AcceptTradeComponent, {
      data: { trade: $event },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.tradeService.confirmTrade($event.id_trade).subscribe(res => {
          this.angulartics2.eventTrack.next({
            action: 'confirm-trade',
            properties: {
              category: this.team.team.slug,
            }
          });
          this.snackbar.open('Troca confirmada', null, { duration: 3000 });
          this.teamService.getTrades(this.team.id_sl).subscribe(teamTrades => {
            this.store.dispatch<UpdateTrade>({ type: UPDATE_TRADE, payload: { teamTrades } });
            this.trades = teamTrades.team.received_trades;
          });
        });
      }
    });
  }

  ngOnInit() {
    this.title.setTitle(`Superliga - Propostas recebidas`);
    this.userService.user.subscribe(user => {
      if (user) {
        this.team = this.teamService.getDefaultTeam(user.teams);
        this.teamService.getTrades(this.team.id_sl).subscribe(teamTrades => {
          this.trades = teamTrades.team.received_trades;
          this.trades.forEach((trade: ReceivedTrade) => {
            trade.trade_comment = trade.trade_comment && trade.trade_comment.replace(/\n/g, '<br/>');
          });
        });
      }
    });
  }

}
