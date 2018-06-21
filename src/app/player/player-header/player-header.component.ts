import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../services/player/player.service';
import { getAge } from '../../../lib/utils';

@Component({
  selector: 'app-player-header',
  templateUrl: './player-header.component.html',
  styleUrls: ['./player-header.component.css']
})
export class PlayerHeaderComponent implements OnInit {

  @Input() player: Player;

  getAge = getAge;

  constructor() { }

  ngOnInit() {
  }

}
