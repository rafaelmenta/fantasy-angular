import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Conference } from '../../../../../typings';
import { AdminRound } from '../../../service/system/system';
import { Observable } from 'rxjs';
import { SystemService } from '../../../service/system/system.service';

@Component({
  selector: 'app-league-conference',
  templateUrl: './league-conference.component.html',
  styleUrls: ['./league-conference.component.css']
})
export class LeagueConferenceComponent implements OnInit {

  @Input() conference: Conference;
  @Output() save = new EventEmitter<Conference>();

  onSave(conference: Conference) {
    this.save.emit(conference);
  }

  constructor() { }

  ngOnInit() {
  }

}
