import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { StoreModule } from '@ngrx/store';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DragulaModule } from 'ng2-dragula';
import { CalendarModule } from 'angular-calendar';

import {  Angulartics2Module } from 'angulartics2';
import {  Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatCardModule, MatToolbarModule, MatIconModule,
  MatBadgeModule, MatInputModule, MatMenuModule, MatTableModule, MatSortModule, MatExpansionModule,
  MatListModule, MatChipsModule, MatGridListModule, MatTabsModule, MatButtonToggleModule,
  MatDialogModule, MatSnackBarModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatAutocompleteModule, MatSelectModule, MatSidenavModule, MatPaginatorModule, MatPaginatorIntl
} from '@angular/material';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MinutesChartComponent } from './team/minutes-chart/minutes-chart.component';
import { RecentTeamGamesComponent } from './team/recent-team-games/recent-team-games.component';
import { RosterComponent } from './roster/roster/roster.component';
import { ClubhouseComponent } from './team/clubhouse/clubhouse.component';
import { RosterTileComponent } from './roster/roster-tile/roster-tile.component';
import { StandingsComponent } from './standings/standings/standings.component';
import { TeamRankingComponent } from './standings/team-ranking/team-ranking.component';
import { ProfileComponent } from './player/profile/profile.component';
import { IndexComponent } from './index/index.component';
import { APP_CONFIG, AppConfig } from './app.config';
import { HttpClientModule } from '@angular/common/http';

import { TeamPlayersComponent } from './team/team-players/team-players.component';
import { NextTeamGamesComponent } from './team/next-team-games/next-team-games.component';
import { TeamPicksComponent } from './team/team-picks/team-picks.component';
import { DropPlayerComponent } from './roster/drop-player/drop-player.component';
import { LoginComponent } from './login/login/login.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogoutComponent } from './logout/logout.component';
import { TradeComponent } from './trade/trade/trade.component';
import { CreateTradeComponent } from './trade/create-trade/create-trade.component';
import { ReceivedTradesComponent } from './trade/received-trades/received-trades.component';
import { SentTradesComponent } from './trade/sent-trades/sent-trades.component';
import { TradeTeamComponent } from './trade/trade-team/trade-team.component';
import { tradeReducer } from './store/trade.reducer';

import { userTeamReducer } from './store/user-team.reducer';
import { leagueReducer } from './store/league.reducer';
import { FreeAgentsComponent } from './free-agents/free-agents/free-agents.component';
import { freeAgentsReducer } from './store/free-agents.reducer';
import { HomeComponent } from './public/home/home/home.component';
import { LoginWidgetComponent } from './login/login-widget/login-widget.component';
import { AcceptTradeComponent } from './trade/accept-trade/accept-trade.component';
import { PlayerNextGamesComponent } from './player/player-next-games/player-next-games.component';
import { PlayerChartComponent } from './player/player-chart/player-chart.component';
import { PlayerHeaderComponent } from './player/player-header/player-header.component';
import { PlayerStatsComponent } from './player/player-stats/player-stats.component';
import { FooterComponent } from './footer/footer.component';
import { PlayerLastGamesComponent } from './player/player-last-games/player-last-games.component';
import { BoxscoreComponent } from './boxscore/boxscore.component';
import { TeamScoreComponent } from './boxscore/team-score/team-score.component';
import { ScheduleComponent } from './schedule/schedule.component';

import { TeamScheduleComponent } from './schedule/team-schedule/team-schedule.component';
import { NbaScheduleComponent } from './schedule/nba-schedule/nba-schedule.component';
import { freeAgencyHistoryReducer } from './store/free-agents-history.reducer';
import { FreeAgencyHistoryComponent } from './free-agents/free-agency-history/free-agency-history.component';
import { TypeaheadComponent } from './toolbar/typeahead/typeahead.component';
import { StatsComponent } from './stats/stats.component';
import { TeamStatsComponent } from './stats/team-stats/team-stats.component';
import { NbaStatsComponent } from './stats/nba-stats/nba-stats.component';
import { FiltersComponent } from './stats/filters/filters.component';

import { PlayersTableComponent } from './stats/players-table/players-table.component';
import { LoadingComponent } from './loading/loading.component';
import { TradeHistoryComponent } from './trade/trade-history/trade-history.component';
import { tradeHistoryReducer } from './store/trade-history.reducer';
import { SidenavComponent } from './toolbar/sidenav/sidenav.component';
import { DraftComponent } from './draft/draft/draft.component';
import { DraftOverviewComponent } from './draft/draft-overview/draft-overview.component';
import { DraftListComponent } from './draft/draft-list/draft-list.component';
import { OnTheClockComponent } from './draft/on-the-clock/on-the-clock.component';

import { MomentModule } from 'ngx-moment';
import { PlayerLookupComponent } from './common/player-lookup/player-lookup.component';
import { TeamPickerComponent } from './toolbar/team-picker/team-picker.component';
import { StandingsWidgetComponent } from './team/standings-widget/standings-widget.component';
import { TeamInfoComponent } from './team/team-info/team-info.component';
import { TeamOverviewComponent } from './team/team-overview/team-overview.component';
import { TeamHistoryComponent } from './team/team-history/team-history.component';
import { TeamStatComponent } from './team/team-stat/team-stat.component';
import { SimulatorComponent } from './simulator/simulator/simulator.component';
import { AvatarComponent } from './common/avatar/avatar.component';
import { LookupComponent } from './common/lookup/lookup.component';
import { TeamPickerCardComponent } from './trade/create-trade/team-picker-card/team-picker-card.component';
import { FreeAgencyListComponent } from './free-agents/free-agency-list/free-agency-list.component';

import { AdminModule } from './admin/admin.module';
import { AppRouting } from './app.routing';
import { FreeAgencyPaginator } from './providers/free-agency-paginator';
import { CurrencySuffixPipe } from './currency-suffix.pipe';

import { SlPickerComponent} from './common/sl-picker/sl-picker.component';
import { AuctionComponent } from './auction/auction.component';
import { AuctionListComponent } from './auction/auction-list/auction-list.component';
import { AuctionPanelComponent } from './auction/auction-panel/auction-panel.component';
import { CountdownComponent } from './common/countdown/countdown.component';
import { AvailableAuctionPlayersComponent } from './auction/available-auction-players/available-auction-players.component';
import { PlayerBidFormComponent } from './auction/player-bid-form/player-bid-form.component';

import { AuctionInfoComponent } from './auction/auction-info/auction-info.component';
// import { CurrencyMaskDirective } from './directives/mask/currency-mask.directive';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from './directives/mask/currency-mask.config';
import { MaskModule } from './directives/mask/mask.module';

export function tokenGetter() {
  return localStorage.getItem('token');
}

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ClubhouseComponent,
    MinutesChartComponent,
    RecentTeamGamesComponent,
    RosterComponent,
    RosterTileComponent,
    StandingsComponent,
    TeamRankingComponent,
    ProfileComponent,
    IndexComponent,
    TeamPlayersComponent,
    NextTeamGamesComponent,
    TeamPicksComponent,
    DropPlayerComponent,
    LoginComponent,
    NotFoundComponent,
    LogoutComponent,
    TradeComponent,
    CreateTradeComponent,
    ReceivedTradesComponent,
    SentTradesComponent,
    TradeTeamComponent,
    FreeAgentsComponent,
    HomeComponent,
    LoginWidgetComponent,
    AcceptTradeComponent,
    PlayerNextGamesComponent,
    PlayerChartComponent,
    PlayerHeaderComponent,
    PlayerStatsComponent,
    FooterComponent,
    PlayerLastGamesComponent,
    BoxscoreComponent,
    TeamScoreComponent,
    ScheduleComponent,
    TeamScheduleComponent,
    NbaScheduleComponent,
    FreeAgencyHistoryComponent,
    TypeaheadComponent,
    StatsComponent,
    TeamStatsComponent,
    NbaStatsComponent,
    FiltersComponent,
    PlayersTableComponent,
    LoadingComponent,
    TradeHistoryComponent,
    SidenavComponent,
    DraftComponent,
    DraftOverviewComponent,
    DraftListComponent,
    OnTheClockComponent,
    PlayerLookupComponent,
    TeamPickerComponent,
    StandingsWidgetComponent,
    TeamInfoComponent,
    TeamOverviewComponent,
    TeamHistoryComponent,
    TeamStatComponent,
    SimulatorComponent,
    AvatarComponent,
    LookupComponent,
    TeamPickerCardComponent,
    FreeAgencyListComponent,
    CurrencySuffixPipe,
    SlPickerComponent,
    AuctionComponent,
    AuctionListComponent,
    AuctionPanelComponent,
    CountdownComponent,
    AvailableAuctionPlayersComponent,
    PlayerBidFormComponent,
    AuctionInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatInputModule,
    MatMenuModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    NgxChartsModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MaskModule,
    // CurrencyMaskModule,
    MomentModule,
    DragulaModule,
    StoreModule.forRoot({
      trades: tradeReducer,
      userTeam: userTeamReducer,
      league: leagueReducer,
      freeAgents: freeAgentsReducer,
      freeAgencyHistory: freeAgencyHistoryReducer,
      tradeHistory: tradeHistoryReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }), NgProgressModule.forRoot({
      // spinnerPosition: 'left',
      color: '#f71cff',
      thick: true
    }),
    NgProgressHttpModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          // move to env var
          'localhost:3000',
          'api.draftbrasil.net',
          'api-dev.draftbrasil.net',
        ],
        // blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    CalendarModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),

    AppRouting,
    AdminModule,
  ],
  entryComponents: [
    DropPlayerComponent,
    AcceptTradeComponent,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: AppConfig },
    JwtHelperService,
    { provide: MatPaginatorIntl, useClass: FreeAgencyPaginator },
    { provide: CURRENCY_MASK_CONFIG, useValue: {
      align: 'right',
      allowNegative: false,
      decimal: ',',
      precision: 0,
      prefix: '$ ',
      suffix: '',
      thousands: '.'
    } as CurrencyMaskConfig},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
