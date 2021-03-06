import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminLeagueComponent } from './admin-league/admin-league.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminPlayerComponent } from './admin-player/admin-player.component';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { AdminSystemComponent } from './admin-system/admin-system.component';
import { AdminNbaComponent } from './admin-system/forms/admin-nba/admin-nba.component';
import { AdminRoundsComponent } from './admin-system/forms/admin-rounds/admin-rounds.component';
import { AdminActiveGamesComponent } from './admin-system/forms/admin-active-games/admin-active-games.component';
import { AdminGamePerformanceComponent } from './admin-system/forms/admin-game-performance/admin-game-performance.component';
import { AdminSystemSummaryComponent } from './admin-system/forms/admin-system-summary/admin-system-summary.component';
import { AdminSummaryComponent } from './admin-summary/admin-summary.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminUserEditComponent } from './admin-user/admin-user-edit/admin-user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOverviewComponent,
    canActivate: [AdminAuthGuardService],
    children: [{
      path: '',
      component: AdminSummaryComponent,
    }, {
      path: 'league',
      component: AdminLeagueComponent,
    }, {
      path: 'team',
      component: AdminTeamComponent,
    }, {
      path: 'user',
      children: [{
        path: '',
        component: AdminUserComponent,
      }, {
        path: 'edit',
        redirectTo: 'edit/',
      }, {
        path: 'edit/:login',
        component: AdminUserEditComponent,
      }],
    }, {
      path: 'system',
      component: AdminSystemComponent,
      children: [{
        path: '',
        component: AdminSystemSummaryComponent,
      }, {
        path: 'nba',
        component: AdminNbaComponent,
      }, {
        path: 'round',
        component: AdminRoundsComponent,
      }, {
        path: 'games',
        component: AdminActiveGamesComponent,
      }, {
        path: 'games/:id',
        component: AdminGamePerformanceComponent,
      }],
    }, {
      path: 'player',
      component: AdminPlayerComponent,
    }],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
  declarations: []
})
export class AdminRoutesModule { }
