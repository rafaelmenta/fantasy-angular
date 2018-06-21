import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { Team, TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';
import { LeagueService } from '../../services/league/league.service';
import { flatTeams } from '../../../lib/utils';
import { Title } from '@angular/platform-browser';
import { League, Conference } from '../../../typings';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  @ViewChild('group') group: ElementRef;
  @ViewChild('subgroup') subgroup: ElementRef;

  public teams;
  private league: League;
  private conferences: Conference[];

  filterTeams(group, subgroup) {

    group = group || this.group;
    subgroup = subgroup || this.subgroup;

    let teams = flatTeams(this.league);

    if (group.value === 'division') {
      teams = teams.filter(team => team.division === subgroup.value);
    }

    if (group.value === 'conference') {
      teams = teams.filter(team => team.conference === subgroup.value);
    }

    this.teams = teams;
    return teams;
  }

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private title: Title,
    private leagueService: LeagueService) {}

  ngOnInit() {
    this.title.setTitle(`Superliga - Classificação`);
    this.userService.user.subscribe(user => {
      if (user) {
        const team = this.teamService.getDefaultTeam(user.teams);
        const id = team.team.division.conference.league.id_league;
        this.leagueService.getUserLeague(id).subscribe((res: League) => {
          if (!res) {
            return;
          }
          this.league = res;
          this.teams = flatTeams(res);
          this.conferences = res.conferences;

          const group = { value: 'division' };
          const subgroup = { value: this.league.conferences[0].divisions[0].name };
          this.filterTeams(group, subgroup);
        });
      }
    });
  }

}
