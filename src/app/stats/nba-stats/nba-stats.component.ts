import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatPlayer, PlayerService } from '../../services/player/player.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-nba-stats',
  templateUrl: './nba-stats.component.html',
  styleUrls: ['./nba-stats.component.css']
})
export class NbaStatsComponent implements OnInit {

  players$: Observable<StatPlayer[]>;

  constructor(private playerService: PlayerService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle(`Superliga - Estatísticas da NBA`);
    this.players$ = this.playerService.getPlayerStats();
  }

}
