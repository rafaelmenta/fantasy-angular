import { NgModule } from '@angular/core';
import { AdminOverviewComponent } from './admin-overview/admin-overview.component';
import { AdminRoutesModule } from './admin.routing';
import { MatCardModule, MatToolbarModule, MatTabsModule, MatFormFieldModule, MatSelectModule,
  MatInputModule, MatListModule, MatButtonModule, MatIconModule, MatRadioModule,
  MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatTableModule, MatSnackBarModule,
  MatExpansionModule, MatButtonToggleModule, MatDividerModule } from '@angular/material';
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
import { AdminTeamSettingsComponent } from './teadmin-team/admin-team-settings/admin-team-settings.component';
import { AdminTeamPlayersComponent } from './admin-team/forms/admin-team-players/admin-team-players.component';

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
  ]
})
export class AdminModule { }
