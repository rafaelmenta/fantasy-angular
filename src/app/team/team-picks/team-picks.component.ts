import { Component, OnInit, Input } from '@angular/core';
import { Pick } from '../../services/pick/pick.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-team-picks',
  templateUrl: './team-picks.component.html',
  styleUrls: ['./team-picks.component.css']
})
export class TeamPicksComponent implements OnInit {

  @Input() picks: Pick[];
  displayedColumns = ['original-logo', 'year', 'round', 'original'];
  dataSource = new MatTableDataSource<Pick>();

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.picks;
  }

}
