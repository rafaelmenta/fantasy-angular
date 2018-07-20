import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Player } from '../../services/player/player.service';
import { MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Angulartics2 } from 'angulartics2';
import { TeamService } from '../../services/team.service';
import { UserTeam } from '../../services/user.service';

@Component({
  selector: 'app-free-agency-list',
  templateUrl: './free-agency-list.component.html',
  styleUrls: ['./free-agency-list.component.css']
})
export class FreeAgencyListComponent implements OnInit {

  @Input() players: Player[];
  @Input() team: UserTeam;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['name', 'nba', 'p1', 'p2', 'action'];
  dataSource = new MatTableDataSource<Player>();

  constructor(
    private angulartics2: Angulartics2,
    private snackbar: MatSnackBar,
    private teamService: TeamService,
  ) { }

  addPlayer(player: Player) {
    this.teamService.addPlayer(this.team, player).subscribe(res => this.onSuccessAdd(res, player));
  }

  onSuccessAdd(res, player: Player) {
    const action = res.recruitPlayer ? 'add-player' : 'add-player-fail';
    const message = res.recruitPlayer ? 'Jogador adicionado' : 'Jogador não disponível';

    this.angulartics2.eventTrack.next({
      action,
      properties: {
        category: player.player_slug,
      }
    });

    this.players = this.players.filter(freeAgent => player.id_player !== freeAgent.id_player);
    this.dataSource.data = this.players;
    this.snackbar.open(message, null, { duration: 3000 });
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = this.players;
  }

}
