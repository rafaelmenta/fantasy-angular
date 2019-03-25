import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../services/team.service';
import { LeagueService } from '../../services/league/league.service';
import { League, Division } from '../../../typings';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-standings-widget',
  templateUrl: './standings-widget.component.html',
  styleUrls: ['./standings-widget.component.css']
})
export class StandingsWidgetComponent implements OnInit {

  @Input() team: Team;

  division$: Observable<Division>;
  league$: Observable<League>;

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    const leagueId = this.team.team_overview.division.conference.league.id_league;
    this.league$ = this.leagueService.getUserLeague(leagueId);

    this.division$ = this.league$.pipe(
      filter(league => league !== undefined),
      map(league => {
        let div: Division;
        league.conferences.forEach(conference => {
          conference.divisions.forEach(division => {
            if (division.id_division === this.team.team_overview.division.id_division) {
              div = division;
            }
          });
        });
        return div;
      }),
      filter(division => division !== undefined),
    );
  }
}
