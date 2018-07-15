import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../service/system/system.service';
import { Observable } from 'rxjs';
import { AdminRound } from '../../../service/system/system';

@Component({
  selector: 'app-admin-rounds',
  templateUrl: './admin-rounds.component.html',
  styleUrls: ['./admin-rounds.component.css']
})
export class AdminRoundsComponent implements OnInit {

  rounds$: Observable<AdminRound[]>;
  displayedColumns = ['round', 'openDate', 'closeDate', 'processed', 'actions'];

  constructor(private system: SystemService) { }

  ngOnInit() {
    this.rounds$ = this.system.rounds$;
  }

}
