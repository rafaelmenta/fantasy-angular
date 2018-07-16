import { NgModule } from '@angular/core';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminRoutesModule } from './admin.routing';
import { MatCardModule, MatToolbarModule, MatTabsModule, MatFormFieldModule, MatSelectModule,
  MatInputModule, MatListModule, MatButtonModule, MatIconModule, MatRadioModule,
  MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatTableModule, MatSnackBarModule,
  MatExpansionModule, MatButtonToggleModule, MatDividerModule, MatCheckboxModule, MatSlideToggleModule } from '@angular/material';
import { AdminLeagueComponent } from './admin-league/admin-league.component';
import { CommonModule } from '@angular/common';
import { AdminTeamComponent } from './admin-team/admin-team.component';
import { AdminPlayerComponent } from './admin-player/admin-player.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeagueInfoComponent } from './admin-league/forms/league-info/league-info.component';
import { LeagueConferenceComponent } from './admin-league/forms/league-conference/league-conference.component';
import { AdminGamesComponent } from './admin-league/admin-games/admin-games.component';
import { LeagueGameComponent } from './admin-league/forms/league-game/league-game.component';
import { AdminDraftListComponent } from './admin-league/admin-draft-list/admin-draft-list.component';
import { AdminDraftInfoComponent } from './admin-league/admin-draft-info/admin-draft-info.component';
import { MomentModule } from 'ngx-moment';
import { AdminTeamPlayersComponent } from './admin-team/forms/admin-team-players/admin-team-players.component';
import { AdminPlayerSettingsComponent } from './admin-player/forms/admin-player-settings/admin-player-settings.component';
import { AdminTeamSettingsComponent } from './admin-team/forms/admin-team-settings/admin-team-settings.component';
import { AdminSystemComponent } from './admin-system/admin-system.component';
import { AdminNbaComponent } from './admin-system/forms/admin-nba/admin-nba.component';
import { AdminNbaGamesComponent } from './admin-system/forms/admin-nba-games/admin-nba-games.component';
import { AdminNbaGameComponent } from './admin-system/forms/admin-nba-game/admin-nba-game.component';
import { AdminRoundsComponent } from './admin-system/forms/admin-rounds/admin-rounds.component';
import { AdminActiveGamesComponent } from './admin-system/forms/admin-active-games/admin-active-games.component';
import { AdminGamePerformanceComponent } from './admin-system/forms/admin-game-performance/admin-game-performance.component';
import { AdminTeamBoxscoreComponent } from './admin-system/forms/admin-team-boxscore/admin-team-boxscore.component';
import { LeagueConfigsComponent } from './admin-league/forms/league-configs/league-configs.component';
import { AdminSystemSummaryComponent } from './admin-system/forms/admin-system-summary/admin-system-summary.component';
import { AdminSummaryComponent } from './admin-summary/admin-summary.component';

@NgModule({
  imports: [
    AdminRoutesModule,
    CommonModule,
    FormsModule,

    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSidenavModule,
    MatNativeDateModule,
    MatTableModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSlideToggleModule,

    FormsModule,
    ReactiveFormsModule,
    MomentModule,
  ],
  declarations: [
    AdminOverviewComponent,
    AdminLeagueComponent,
    AdminTeamComponent,
    AdminPlayerComponent,
    LeagueInfoComponent,
    LeagueConferenceComponent,
    AdminGamesComponent,
    LeagueGameComponent,
    AdminDraftListComponent,
    AdminDraftInfoComponent,
    AdminTeamSettingsComponent,
    AdminTeamPlayersComponent,
    AdminPlayerSettingsComponent,
    AdminSystemComponent,
    AdminNbaComponent,
    AdminNbaGamesComponent,
    AdminNbaGameComponent,
    AdminRoundsComponent,
    AdminActiveGamesComponent,
    AdminGamePerformanceComponent,
    AdminTeamBoxscoreComponent,
    LeagueConfigsComponent,
    AdminSystemSummaryComponent,
    AdminSummaryComponent,
  ]
})
export class AdminModule { }
