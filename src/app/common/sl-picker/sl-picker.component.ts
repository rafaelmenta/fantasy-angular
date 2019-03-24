import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { UserTeam, UserService, User } from '../../services/user.service';
import { TeamService, Team, BasicTeam } from '../../services/team.service';
import { Angulartics2 } from 'angulartics2';
import { map, filter, tap, mergeAll } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LeagueService } from 'src/app/services/league/league.service';
import { flatTeams } from 'src/lib/utils';
import { League } from 'src/typings';

@Component({
  selector: 'app-sl-picker',
  templateUrl: './sl-picker.component.html',
  styleUrls: ['./sl-picker.component.css']
})
export class SlPickerComponent implements OnInit {

  @Output() select: EventEmitter<{ team: BasicTeam }> = new EventEmitter();

  teams$: Observable<BasicTeam[]>;
  defaultTeam: Observable<UserTeam>;
  selectedTeam$: Observable<BasicTeam>;

  constructor(
    private userService: UserService,
    private angulartics: Angulartics2,
    private leagueService: LeagueService,
    private teamService: TeamService,
  ) { }

  selectTeam(team: BasicTeam) {
    this.selectedTeam$ = of(team);
    this.select.emit({team});
  }

  ngOnInit() {
    const user$ = this.userService.user.pipe(filter(user => user !== undefined));
    this.defaultTeam = user$.pipe(map(user => this.teamService.getDefaultTeam(user.teams)));
    this.selectedTeam$ = this.defaultTeam.pipe(
      map(userTeam => ({
        id_sl: userTeam.id_sl,
        city: userTeam.team.city,
        nickname: userTeam.team.nickname,
        slug: userTeam.team.slug,
      }))
    );

    this.teams$ = this.defaultTeam.pipe(
      map(team => this.leagueService.getUserLeague(team.team.division.conference.league.id_league)),
      mergeAll(),
      filter(league => league !== undefined),
      map(league => flatTeams((league as League))),
    );
  }

}
