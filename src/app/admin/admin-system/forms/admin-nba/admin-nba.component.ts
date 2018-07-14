import { Component, OnInit, ViewChild } from '@angular/core';
import { SystemService } from '../../../service/system/system.service';
import { AdminGameNBA } from '../../../service/system/system';
import { Observable } from 'rxjs';
import { AdminNbaGamesComponent } from '../admin-nba-games/admin-nba-games.component';

@Component({
  selector: 'app-admin-nba',
  templateUrl: './admin-nba.component.html',
  styleUrls: ['./admin-nba.component.css']
})
export class AdminNbaComponent implements OnInit {

  games$: Observable<AdminGameNBA[]>;
  @ViewChild(AdminNbaGamesComponent) gamesComponent: AdminNbaGamesComponent;

  constructor(private system: SystemService) { }

  onCreate(games: AdminGameNBA[], $event: AdminGameNBA) {
    games.unshift($event);
    this.gamesComponent.onSearchChange();
  }

  ngOnInit() {
    this.games$ = this.system.getNbaGames();
  }

}
