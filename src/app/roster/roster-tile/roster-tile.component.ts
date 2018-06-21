import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../services/player/player.service';

@Component({
  selector: 'app-roster-tile',
  templateUrl: './roster-tile.component.html',
  styleUrls: ['./roster-tile.component.css']
})
export class RosterTileComponent implements OnInit {

  @Input() player: Player;
  @Input() first: boolean;
  @Input() last: boolean;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  @Output() remove: EventEmitter<Player> = new EventEmitter<Player>();
  @Output() swap: EventEmitter<Player> = new EventEmitter<Player>();

  dropPlayer() {
    this.remove.emit(this.player);
  }

  swapPosition() {
    this.swap.emit(this.player);
  }

  move(direction: string) {
    if (direction === 'forward') {
      this.player.team_info.order += 1;
    } else {
      this.player.team_info.order -= 1;
    }

    this.change.emit(direction);
  }

  constructor() { }

  ngOnInit() {
  }

}
