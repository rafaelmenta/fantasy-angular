import { Component, OnInit, Input } from '@angular/core';
import { GameService, Game } from '../services/game/game.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-boxscore',
  templateUrl: './boxscore.component.html',
  styleUrls: ['./boxscore.component.css']
})
export class BoxscoreComponent implements OnInit {

  @Input() id: number;
  game$: Observable<Game>;

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private gameService: GameService) { }

  ngOnInit() {
    this.title.setTitle(`Superliga - Boxscore`);
    this.game$ = this.route.paramMap.pipe(
      mergeMap(paramMap => this.gameService.getBoxscore(paramMap.get('id'))),
    );
  }

}
