import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../services/team.service';
import { Player } from '../../services/player/player.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {

  @Input() element: Player | Team;

  constructor() { }

  get isPlayer() {
    return this.element && (this.element as Player).id_player !== 0;
  }

  ngOnInit() {
  }

}
