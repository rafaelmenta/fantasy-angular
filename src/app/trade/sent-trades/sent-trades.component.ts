import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TeamService, Team } from '../../services/team.service';
import { SentTrade, Trade, TradeService } from '../../services/trade/trade.service';
import { MatSnackBar } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-sent-trades',
  templateUrl: './sent-trades.component.html',
  styleUrls: ['./sent-trades.component.css']
})
export class SentTradesComponent implements OnInit {

  trades: SentTrade[];
  team: Team;

  constructor(
    private userService: UserService,
    private tradeService: TradeService,
    private snackbar: MatSnackBar,
    private title: Title,
    private angulartics2: Angulartics2,
    private teamService: TeamService) { }

  cancelTrade(trade: Trade) {
    this.tradeService.cancelTrade(trade.id_trade, 'sent').subscribe((res: any) => {
      if (res.removeTrade) {
        this.trades = this.trades.filter(sentTrade => trade.id_trade !== sentTrade.id_trade);
        this.angulartics2.eventTrack.next({
          action: 'cancel-trade',
          properties: {
            category: this.team.team.slug,
          }
        });
        this.snackbar.open('Troca cancelada', null, { duration: 5000 });
      }
    });
  }

  ngOnInit() {
    this.title.setTitle(`Superliga - Propostas enviadas`);
    this.userService.user.subscribe(user => {
      if (user) {
        this.team = this.teamService.getDefaultTeam(user.teams);
        this.teamService.getTrades(this.team.id_sl).subscribe(teamTrades => {
          this.trades = teamTrades.team.sent_trades;
          this.trades.forEach((trade: Trade) => {
            trade.trade_comment = trade.trade_comment && trade.trade_comment.replace(/\n/g, '<br/>');
          });
        });
      }
    });
  }

}
