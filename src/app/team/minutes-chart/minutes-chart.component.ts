import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Team } from '../../services/team.service';

@Component({
  selector: 'app-minutes-chart',
  templateUrl: './minutes-chart.component.html',
  styleUrls: ['./minutes-chart.component.css']
})
export class MinutesChartComponent implements OnChanges {

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Posição';
  showYAxisLabel = true;
  yAxisLabel = 'Minutos';

  colorScheme = {
    domain: ['#283593', '#5C6BC0', '#E8EAF6', '#EC407A', '#AD1457'],
  };

  @Input() stats: Team['team_overview']['stats'];
  chartData: {name: string, value: number}[];

  constructor() {
  }

  ngOnChanges() {
    if (this.stats) {
      this.chartData = [
        { name: 'PG', value: this.stats.minutes_pg },
        { name: 'SG', value: this.stats.minutes_sg },
        { name: 'SF', value: this.stats.minutes_sf },
        { name: 'PF', value: this.stats.minutes_pf },
        { name: 'C', value: this.stats.minutes_c },
      ];
    }
  }

}
