import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RosterComponent } from './roster/roster/roster.component';
import { AuthGuardService } from './services/auth/auth-guard/auth-guard.service';
import { SimulatorComponent } from './simulator/simulator/simulator.component';
import { StandingsComponent } from './standings/standings/standings.component';
import { FreeAgentsComponent } from './free-agents/free-agents/free-agents.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { DraftComponent } from './draft/draft/draft.component';
import { StatsComponent } from './stats/stats.component';
import { TeamStatsComponent } from './stats/team-stats/team-stats.component';
import { NbaStatsComponent } from './stats/nba-stats/nba-stats.component';
import { ProfileComponent } from './player/profile/profile.component';
import { BoxscoreComponent } from './boxscore/boxscore.component';
import { TradeComponent } from './trade/trade/trade.component';
import { TradeHistoryComponent } from './trade/trade-history/trade-history.component';
import { CreateTradeComponent } from './trade/create-trade/create-trade.component';
import { ReceivedTradesComponent } from './trade/received-trades/received-trades.component';
import { SentTradesComponent } from './trade/sent-trades/sent-trades.component';
import { ClubhouseComponent } from './team/clubhouse/clubhouse.component';
import { TeamOverviewComponent } from './team/team-overview/team-overview.component';
import { TeamHistoryComponent } from './team/team-history/team-history.component';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { IndexComponent } from './index/index.component';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {
    path: 'roster',
    component: RosterComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'simulator',
    component: SimulatorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'standings',
    component: StandingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'free-agents',
    component: FreeAgentsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'draft',
    component: DraftComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'draft/:id',
    component: DraftComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'team',
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
      {
        path: 'team',
        component: TeamStatsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
      {
        path: 'nba',
        component: NbaStatsComponent,
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'player/:id',
    component: ProfileComponent,
  },
  {
    path: 'boxscore/:id',
    component: BoxscoreComponent,
  },
  {
    path: 'trade',
    component: TradeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
      {
        path: 'history',
        component: TradeHistoryComponent,
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
      {
        path: 'create',
        component: CreateTradeComponent,
        pathMatch: 'full',
        canActivate: [AuthGuardService],
      },
      {
        path: 'received',
        component: ReceivedTradesComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'sent',
        component: SentTradesComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'home',
    component: ClubhouseComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        pathMatch: 'full',
        component: TeamOverviewComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: TeamHistoryComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'team/:id',
    component: ClubhouseComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        pathMatch: 'full',
        component: TeamOverviewComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'history',
        pathMatch: 'full',
        component: TeamHistoryComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
  },
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  declarations: [],
})
export class AppRouting { }
