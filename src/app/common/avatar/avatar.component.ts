import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../services/player/player.service';
import { Team, TeamLookup } from '../../services/team.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input() element: Player|TeamLookup;

  get isPlayer() {
    return this.element && (this.element as Player).id_player !== undefined;
  }

  get isTeam() {
    return this.element && (this.element as TeamLookup).id_sl !== undefined;
  }

  constructor() { }

  ngOnInit() {
  }

}
