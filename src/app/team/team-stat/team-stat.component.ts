import { Component, OnInit, Input } from '@angular/core';
import { TeamStatHistory } from '../../services/archive/archive.service';
import { compare } from '../../../lib/utils';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-team-stat',
  templateUrl: './team-stat.component.html',
  styleUrls: ['./team-stat.component.css']
})
export class TeamStatComponent implements OnInit {

  @Input() stats: TeamStatHistory[];

  displayedColumns = ['season', 'name', 'wins', 'losses', 'fpg'];
  dataSource = new MatTableDataSource<TeamStatHistory>();

  constructor() { }

  ngOnInit() {
    this.dataSource.data = this.stats.sort((a, b) => compare(a.id_season, b.id_season, false));
  }

}
