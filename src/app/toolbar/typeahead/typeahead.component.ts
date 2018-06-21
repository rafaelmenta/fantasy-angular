import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, debounce, debounceTime, tap, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { TeamService, Team } from '../../services/team.service';
import { LeagueService } from '../../services/league/league.service';
import { Player } from '../../services/player/player.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Router } from '@angular/router';

export interface StateGroup {
  name: string;
  values: string[];
  type: string;
}

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css']
})
export class TypeaheadComponent implements OnInit {
  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });

  autocompleteOptions$;

  constructor(
    private userService: UserService,
    private leagueService: LeagueService,
    private teamService: TeamService,
    private router: Router,
    private fb: FormBuilder) { }

  selectOption($event: MatAutocompleteSelectedEvent) {
    const value = $event.option.value;

    if (value.id_player) {
      this.router.navigate(['player', value.player_slug], {queryParams: {utm_medium: 'search'}});
    }

    if (value.id_sl) {
      this.router.navigate(['team', value.slug], {queryParams: {utm_medium: 'search'}});
    }
  }

  showValue(item) {
    if (item.id_player) {
      return `${item.first_name} ${item.last_name}`;
    }

    if (item.id_sl) {
      return `${item.city} ${item.nickname}`;
    }
  }

  ngOnInit() {
    this.autocompleteOptions$ = this.stateForm.get('stateGroup').valueChanges
      .pipe(
        startWith(''),
        debounceTime(150),
        switchMap(query => query ? this.leagueService.getSearch(1, query) : []),
        map(res => {
          return [
            {letter: 'Jogadores', names: res.search_players, type: 'player'},
            {letter: 'Equipes', names: res.search_teams, type: 'team'},
          ];
        })
      );
  }
}
