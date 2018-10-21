import { Component, OnInit } from '@angular/core';
import { SystemService } from '../../../service/system/system.service';
import { Observable } from 'rxjs';
import { AdminRound } from '../../../service/system/system';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-rounds',
  templateUrl: './admin-rounds.component.html',
  styleUrls: ['./admin-rounds.component.css']
})
export class AdminRoundsComponent implements OnInit {

  rounds$: Observable<AdminRound[]>;
  displayedColumns = ['round', 'openDate', 'closeDate', 'processed', 'actions'];

  constructor(private system: SystemService, private snackbar: MatSnackBar) { }

  onOpen(round: AdminRound) {
    this.system.openRound(round).subscribe(result => {
      if (result.openRound) {
        round.opened = true;
        this.snackbar.open('Rodada aberta', null, { duration: 3000 });
      }
    });
  }

  onClose(round: AdminRound) {
    this.system.closeRound(round).subscribe(result => {
      if (result.closeRound) {
        round.processed = true;
        this.snackbar.open('Rodada fechada', null, { duration: 3000 });
      }
    });
  }

  ngOnInit() {
    this.rounds$ = this.system.rounds$;
  }

}
