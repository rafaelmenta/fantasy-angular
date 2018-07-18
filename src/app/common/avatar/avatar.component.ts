import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../services/player/player.service';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input() element: Player|Team;

  get isPlayer() {
    return this.element && (this.element as Player).id_player !== undefined;
  }

  constructor() { }

  ngOnInit() {
  }

}
