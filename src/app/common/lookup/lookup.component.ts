import { Component, OnInit, Input } from '@angular/core';
import { Team, TeamLookup } from '../../services/team.service';
import { Player } from '../../services/player/player.service';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css']
})
export class LookupComponent implements OnInit {

  @Input() element: Player | TeamLookup;
  @Input() showAvatar = true;

  constructor() { }

  get isPlayer() {
    return this.element && (this.element as Player).id_player !== 0;
  }

  get isTeam() {
    return this.element && (this.element as TeamLookup).id_sl !== 0;
  }

  ngOnInit() {
  }

}
