import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { PlayerFilters, FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filters: FormGroup;

  teams = [
    {'id_nba': 1, 'city': 'Atlanta', 'nickname': 'Hawks'},
    {'id_nba': 2, 'city': 'Boston', 'nickname': 'Celtics'},
    {'id_nba': 3, 'city': 'Charlotte', 'nickname': 'Hornets'},
    {'id_nba': 4, 'city': 'Chicago', 'nickname': 'Bulls'},
    {'id_nba': 5, 'city': 'Cleveland', 'nickname': 'Cavaliers'},
    {'id_nba': 6, 'city': 'Dallas', 'nickname': 'Mavericks'},
    {'id_nba': 7, 'city': 'Denver', 'nickname': 'Nuggets'},
    {'id_nba': 8, 'city': 'Detroit', 'nickname': 'Pistons'},
    {'id_nba': 9, 'city': 'Golden State', 'nickname': 'Warriors'},
    {'id_nba': 10, 'city': 'Houston', 'nickname': 'Rockets'},
    {'id_nba': 11, 'city': 'Indiana', 'nickname': 'Pacers'},
    {'id_nba': 12, 'city': 'Los Angeles', 'nickname': 'Clippers'},
    {'id_nba': 13, 'city': 'Los Angeles', 'nickname': 'Lakers'},
    {'id_nba': 14, 'city': 'Memphis', 'nickname': 'Grizzlies'},
    {'id_nba': 15, 'city': 'Miami', 'nickname': 'Heat'},
    {'id_nba': 16, 'city': 'Milwaukee', 'nickname': 'Bucks'},
    {'id_nba': 17, 'city': 'Minnesota', 'nickname': 'Timberwolves'},
    {'id_nba': 18, 'city': 'Brooklyn', 'nickname': 'Nets'},
    {'id_nba': 19, 'city': 'New Orleans', 'nickname': 'Pelicans'},
    {'id_nba': 20, 'city': 'New York', 'nickname': 'Knicks'},
    {'id_nba': 21, 'city': 'Oklahoma City', 'nickname': 'Thunder'},
    {'id_nba': 22, 'city': 'Orlando', 'nickname': 'Magic'},
    {'id_nba': 23, 'city': 'Philadelphia', 'nickname': '76ers'},
    {'id_nba': 24, 'city': 'Phoenix', 'nickname': 'Suns'},
    {'id_nba': 25, 'city': 'Portland Trail', 'nickname': 'Blazers'},
    {'id_nba': 26, 'city': 'Sacramento', 'nickname': 'Kings'},
    {'id_nba': 27, 'city': 'San Antonio', 'nickname': 'Spurs'},
    {'id_nba': 28, 'city': 'Toronto', 'nickname': 'Raptors'},
    {'id_nba': 29, 'city': 'Utah', 'nickname': 'Jazz'},
    {'id_nba': 30, 'city': 'Washington', 'nickname': 'Wizards'},
    {'id_nba': 31, 'city': 'Free', 'nickname': 'Agent'},
  ];

  columns = [
    {id: 'games', name: 'Jogos'},
    {id: 'minutes', name: 'Minutos'},
    {id: 'field_goal_attempts', name: 'FGA'},
    {id: 'free_throw_attempts', name: 'FTA'},
    {id: 'offensive_rebounds', name: 'Rebotes OFF'},
    {id: 'defensive_rebounds', name: 'Rebotes DEF'},
    {id: 'total_rebounds', name: 'Rebotes TOT'},
    {id: 'assists', name: 'Assists'},
    {id: 'steals', name: 'Steals'},
    {id: 'blocks', name: 'Blocks'},
    {id: 'turnovers', name: 'Turnovers'},
    {id: 'personal_fouls', name: 'Faltas'},
    {id: 'points', name: 'Pontos'},
    {id: 'fantasy_points', name: 'FPG'},
    {id: 'fpm', name: 'FPM'},
  ];

  constructor(private fb: FormBuilder, private filterSerivce: FilterService) { }

  ngOnInit() {

    const positions = this.fb.array([]);
    const team = this.fb.control('');
    const rookies = this.fb.control(false);
    const freeAgents = this.fb.control(false);
    const statColumns = this.fb.array([]);

    this.filters = this.fb.group({
      positions,
      team,
      rookies,
      freeAgents,
      statColumns,
    });

    this.filters.valueChanges.subscribe((val: PlayerFilters) => {
      this.filterSerivce.updateFilters(val);
    });
  }

  onColumnsChange($event) {
    const columns = this.filters.get('statColumns') as FormArray;
    const values = $event.source.value;

    const formControl = new FormControl(['name', ...values]);
    columns.setControl(0, formControl);
  }

  onPositionChange($event) {
    const positions = this.filters.get('positions') as FormArray;
    const value = $event.source.value;

    if ($event.checked) {
      positions.push(new FormControl(value));
    } else {
      const filtered = this.fb.array(positions.controls.filter(pos => pos.value !== value));
      this.filters.setControl('positions', filtered);
    }
  }

}
