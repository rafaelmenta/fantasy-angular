import { Component, OnInit, Input } from '@angular/core';
import { PlayerLookup } from '../../services/player/player.service';

@Component({
  selector: 'app-player-lookup',
  templateUrl: './player-lookup.component.html',
  styleUrls: ['./player-lookup.component.css']
})
export class PlayerLookupComponent implements OnInit {

  @Input() player: PlayerLookup;
  @Input() noUrl: boolean;

  constructor() { }

  ngOnInit() {
  }

}
