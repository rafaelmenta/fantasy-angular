import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerService, Player, PlayerNextGame, PlayerPerformances } from '../../services/player/player.service';
import { Observable } from 'rxjs';
import { RoundStat, StatsService } from '../../services/stats/stats.service';
import { Title } from '@angular/platform-browser';
import { map, mergeMap, tap } from 'rxjs/operators';

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

    const id$ = this.route.paramMap.pipe(map(paramMap => paramMap.get('id')));

    this.player$ = id$.pipe(
      mergeMap(id => this.playerService.getPlayer(id)),
      tap(player => this.title.setTitle(`Superliga - ${player.first_name} ${player.last_name}`)),
    );

    this.nextGames$ = id$.pipe(mergeMap(id => this.playerService.getNextGames(id)));
    this.performances$ = id$.pipe(mergeMap(id => this.playerService.getPerformances(id)));
    this.roundAverages$ = this.statsService.getRoundAverages();
  }
}
