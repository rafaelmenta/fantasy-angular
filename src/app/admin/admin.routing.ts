import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminLeagueComponent } from './admin-league/admin-league.component';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminPlayerComponent } from './admin-player/admin-player.component';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { AdminSystemComponent } from './admin-system/admin-system.component';
import { AdminNbaComponent } from './admin-system/forms/admin-nba/admin-nba.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOverviewComponent,
    canActivate: [AdminAuthGuardService],
    children: [{
      path: 'league',
      component: AdminLeagueComponent,
    }, {
      path: 'team',
      component: AdminTeamComponent,
    }, {
      path: 'system',
      component: AdminSystemComponent,
      children: [{
        path: 'nba',
        component: AdminNbaComponent,
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
