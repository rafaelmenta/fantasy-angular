import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { Player } from '../../services/player/player.service';
import { TeamService, Team } from '../../services/team.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { compare, getTeamScore } from '../../../lib/utils';
import { DragulaService } from 'ng2-dragula';
import { BreakpointObserver } from '@angular/cdk/layout';
import { APP_CONFIG, AppConfig } from '../../app.config';

export interface SimulatedPlayer extends Player {
  potential?: number;
}

const defaultColumns = ['handle', 'number', 'name', 'p1p2', 'fpg', 'min', 'fpm', 'potential'];

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.css']
})
export class SimulatorComponent implements OnInit, OnDestroy {

  players = new MatTableDataSource<SimulatedPlayer>();
  team$: Observable<Team>;
  displayedColumns = defaultColumns;

  // Controls scrolling on mobile
  scrollable = true;

  constructor(
    private title: Title,
    private userService: UserService,
    private teamService: TeamService,
    private dragula: DragulaService,
    @Inject(APP_CONFIG) private config: AppConfig,
    private breakpoint$: BreakpointObserver,
  ) { }

  get teamScore() {
    return getTeamScore(this.players.data);
  }

  getPotentialClass(player: SimulatedPlayer) {
    if (player.potential > 0.9) {
      return 'potential-high';
    } else if (player.potential > 0.6) {
      return 'potential-medium';
    }
    return 'potential-low';
  }

  swapPosition(player: SimulatedPlayer) {
    const info = player.team_info;
    const p1 = info.primary_position;
    const p2 = info.secondary_position;

    info.primary_position = p2;
    info.secondary_position = p1;
  }

  setTouchmoveListener() {
    const listener = (e) => {
      if (!this.scrollable) {
        e.preventDefault();
      }
    };

    // @HostListener doesn't accept event options yet, so using native call.
    document.addEventListener('touchmove', listener, { passive: false });
  }

  updateColumns(res) {
    if (res.matches) {
      this.displayedColumns = ['name', 'p1p2', 'fpg', 'potential'];
    } else {
      this.displayedColumns = defaultColumns;
    }
  }

  normalizePlayerOrder(player: SimulatedPlayer, idx: number) {
    player.team_info.order = idx + 1;
  }

  onTeamLoad(team) {
    if (team) {
      const players = team.team_overview.players.sort((a, b) => compare(a.team_info.order, b.team_info.order, true));

      // normalize order values
      players.forEach(this.normalizePlayerOrder.bind(this));
      this.players.data = players;
    }
  }

  onUserLoad(user) {
    if (user) {
      const defaultTeam = this.teamService.getDefaultTeam(user.teams);
      this.team$ = this.teamService.getTeam(defaultTeam.id_sl, true);
      this.team$.subscribe(this.onTeamLoad.bind(this));
    }
  }

  ngOnInit() {
    this.setTouchmoveListener();
    this.breakpoint$.observe(this.config.LARGE_MOBILE_QUERY).subscribe(this.updateColumns.bind(this));

    this.dragula.setOptions('players-bag', {
      revertOnSpill: true,
      invalid: (el: Element) => el.classList.contains('mat-header-row'),
      accepts: (el, source, handle, sibling: Element) => !sibling || !sibling.classList.contains('mat-header-row'),
    });

    this.dragula.drag.subscribe(() => this.scrollable = false);
    this.dragula.dragend.subscribe(() => this.scrollable = true);
    this.dragula.dropModel.subscribe(() => this.players.data.forEach(this.normalizePlayerOrder.bind(this)));

    this.title.setTitle('Superliga - Simulação');
    this.userService.user.subscribe(this.onUserLoad.bind(this));
  }

  ngOnDestroy() {
    this.dragula.destroy('players-bag');
  }

}
