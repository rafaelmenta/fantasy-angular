import { Component, OnInit, Input } from '@angular/core';
import { GameService, Game } from '../services/game/game.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Team } from '../services/team.service';

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
    this.route.paramMap.subscribe(map => {
      const id = map.get('id');
      this.game$ = this.gameService.getBoxscore(id);
    });
  }

}
