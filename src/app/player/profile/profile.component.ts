import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService, Player, PlayerNextGame, PlayerPerformances } from '../../services/player/player.service';
import { Observable } from 'rxjs';
import { RoundStat, StatsService } from '../../services/stats/stats.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() playerId: string;

  player$: Observable<Player>;
  nextGames$ = new Observable<PlayerNextGame>();
  performances$ = new Observable<PlayerPerformances>();
  roundAverages$ = new Observable<RoundStat[]>();

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private statsService: StatsService,
    private title: Title,
  ) { }

  ngOnInit() {
    this.title.setTitle(`Superliga - Jogador`);
    this.route.paramMap.subscribe(map => {

      const id = map.get('id');
      if (id) {
        this.player$ = this.playerService.getPlayer(id);
        this.nextGames$ = this.playerService.getNextGames(id);
        this.performances$ = this.playerService.getPerformances(id);
        this.roundAverages$ = this.statsService.getRoundAverages();

        this.player$.subscribe(player => {
          this.title.setTitle(`Superliga - ${player.first_name} ${player.last_name}`);
        });
      }
    });
  }

}
