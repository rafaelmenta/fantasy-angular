import { Component, Input, OnChanges } from '@angular/core';
import { PlayerPerformances } from '../../services/player/player.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoundStat } from '../../services/stats/stats.service';

interface LineChartEntry {
  name: string;
  series: LineChartData[];
}

interface LineChartData {
  name: number;
  value: number;
}

@Component({
  selector: 'app-player-chart',
  templateUrl: './player-chart.component.html',
  styleUrls: ['./player-chart.component.css']
})
export class PlayerChartComponent implements OnChanges {

  @Input() playerName: string;
  @Input() performances$: Observable<PlayerPerformances>;
  @Input() roundAverages$: Observable<RoundStat[]>;

  perfDatasource: LineChartEntry;
  avgDatasource: LineChartEntry;
  maxDatasource: LineChartEntry;

  combinedDatasource$: Observable<LineChartEntry[]>;

  // Chart options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Rodada';
  showYAxisLabel = true;
  yAxisLabel = 'Fantasy points';

  colorScheme = {
    domain: ['#283593', '#EC407A', '#5C6BC0'],
  };

  constructor() { }

  mapPlayer(player: PlayerPerformances): LineChartEntry {
    return {
      name: this.playerName,
      series: player.performances.map(perf => {
        return {name: perf.round.round_number, value: perf.fantasy_points};
      }),
    };
  }

  mapSeries(stats: RoundStat[], prop: string) {
    return stats.map(perf => {
      return { name: perf.round.round_number, value: perf[prop] };
    });
  }

  ngOnChanges() {
    const max$ = this.roundAverages$.pipe(
      map(stats => ({
        name: 'Melhor da rodada',
        series: this.mapSeries(stats, 'max_fantasy_points')
      } as LineChartEntry))
    );

    const avg$ = this.roundAverages$.pipe(
      map(stats => ({
        name: 'Média da rodada',
        series: this.mapSeries(stats, 'fantasy_points')
      } as LineChartEntry))
    );

    const perf$ = this.performances$.pipe(
      map<PlayerPerformances, LineChartEntry>(this.mapPlayer.bind(this))
    );

    this.combinedDatasource$ = combineLatest(max$, avg$, perf$);
  }
}
