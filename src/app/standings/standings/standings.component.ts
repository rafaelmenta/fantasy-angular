import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Team, TeamService } from '../../services/team.service';
import { UserService, User } from '../../services/user.service';
import { LeagueService } from '../../services/league/league.service';
import { flatTeams } from '../../../lib/utils';
import { Title } from '@angular/platform-browser';
import { League, Conference, Division } from '../../../typings';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  @ViewChild('group') group: any;

  private league: League;

  teams;

  conferences: Conference[];
  divisions: Division[];

  conference: string;
  division: string;

  filterTeams() {
    let teams = flatTeams(this.league);

    if (this.group.value === 'division') {
      teams = teams.filter(team => team.division === this.division);
    }

    if (this.group.value === 'conference') {
      teams = teams.filter(team => team.conference === this.conference);
    }

    this.teams = teams;
    return teams;
  }

  getDivisions(conferences: Conference[]) {
    return conferences.map(conference => conference.divisions).reduce((soFar, divisions) => {
      return [...soFar, ...divisions];
    }, []);
  }

  initDefaults() {
    this.group = { value: 'division' };
    this.division = this.divisions[0].name;
    this.conference = this.conferences[0].name;
  }

  onLeagueLoad(league?: League) {
    if (!league) {
      return;
    }

    this.league = league;
    this.teams = flatTeams(league);

    this.conferences = league.conferences;
    this.divisions = this.getDivisions(this.conferences);

    this.initDefaults();
    this.filterTeams();
  }

  onUserLoad(user?: User) {
    if (user) {
      const team = this.teamService.getDefaultTeam(user.teams);
      const id = team.team.division.conference.league.id_league;
      this.leagueService.getUserLeague(id).subscribe(this.onLeagueLoad.bind(this));
    }
  }

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private title: Title,
    private leagueService: LeagueService) {}

  ngOnInit() {
    this.title.setTitle(`Superliga - Classificação`);
    this.userService.user.subscribe(this.onUserLoad.bind(this));
  }

}
