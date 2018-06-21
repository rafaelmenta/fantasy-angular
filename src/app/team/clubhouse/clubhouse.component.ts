import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatTableDataSource, MatTab } from '@angular/material';
import { Team, TeamService } from '../../services/team.service';
import { Player } from '../../services/player/player.service';
import { ActivatedRoute } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-clubhouse',
  templateUrl: './clubhouse.component.html',
  styleUrls: ['./clubhouse.component.css']
})
export class ClubhouseComponent implements OnInit {
  @Input() id: number;
  team$: Observable<Team>;

  loadTeam(id) {
    let user: User;
    this.userService.user.subscribe(u => user = u);

    let useCache = false;
    if (user) {
      const defaultTeam = this.teamService.getDefaultTeam(user.teams);
      if (this.id === defaultTeam.id_sl) {
        useCache = true;
      }
    }

    this.team$ = this.teamService.getTeam(id, useCache);
    this.team$.subscribe(team => {
      if (team) {
        const title = `Superliga - ${team.team.city} ${team.team.nickname}`;
        this.title.setTitle(title);
      }
    });
  }

  ngOnInit() {
    this.title.setTitle(`Superliga - Equipe`);
    if (this.id) {
      this.loadTeam(this.id);
    } else {
      this.route.paramMap.subscribe(map => {
        const id = map.get('id');
        if (id) {
          this.loadTeam(id);
        }
      });
    }
  }

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private title: Title,
    private route: ActivatedRoute) { }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
