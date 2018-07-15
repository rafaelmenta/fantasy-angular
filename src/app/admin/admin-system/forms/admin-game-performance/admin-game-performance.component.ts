import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SystemService } from '../../../service/system/system.service';
import { AdminGamePerformance } from '../../../service/system/system';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-admin-game-performance',
  templateUrl: './admin-game-performance.component.html',
  styleUrls: ['./admin-game-performance.component.css']
})
export class AdminGamePerformanceComponent implements OnInit {

  game$: Observable<AdminGamePerformance>;
  id: string;

  constructor(
    private router: ActivatedRoute,
    private system: SystemService,
    private route: Router,
    private snackbar: MatSnackBar) { }

  onParamsChange(paramMap: ParamMap) {
    const id = paramMap.get('id');
    this.game$ = this.system.getGamePerformance(id);
  }

  onSave(game: AdminGamePerformance) {
    const performances = [...game.home_performances, ...game.away_performances].map(perf => Object.assign({}, perf));
    performances.forEach(perf => delete perf.player);
    const rounds = [game.id_round_home, game.id_round_away];
    this.system.savePlayerPerformances(rounds, performances).subscribe(res => {
      if (res.saveNbaPerformances) {
        this.snackbar.open('Jogo salvo', null, {duration: 3000});
        this.route.navigate(['admin', 'system', 'games']);
      }
    });
  }

  ngOnInit() {
    this.router.paramMap.subscribe(this.onParamsChange.bind(this));
  }

}
