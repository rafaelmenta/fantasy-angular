import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PlayerRoundPerformance, PlayerPerformances } from '../../services/player/player.service';
import { Observable, merge } from 'rxjs';
import { map, zip } from 'rxjs/operators';
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

  combinedDatasource: LineChartEntry[];

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
    this.roundAverages$.subscribe(stats => {
      const averages = this.mapSeries(stats, 'fantasy_points');
      const max = this.mapSeries(stats, 'max_fantasy_points');
      this.avgDatasource = { name: 'Média da rodada', series: averages };
      this.maxDatasource = { name: 'Melhor da rodada', series: max };
    });

    this.performances$
      .pipe(map<PlayerPerformances, LineChartEntry>(this.mapPlayer.bind(this)))
      .subscribe(data => this.perfDatasource = data);

    this.performances$
      .pipe(zip(this.roundAverages$))
      .subscribe(() => this.combinedDatasource = [
        this.maxDatasource,
        this.perfDatasource,
        this.avgDatasource,
      ]);
  }
}
