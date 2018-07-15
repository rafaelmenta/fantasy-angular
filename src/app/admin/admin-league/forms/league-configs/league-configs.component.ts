import { Component, OnInit, Input } from '@angular/core';
import { AdminLeague, AdminLeagueConfig } from '../../../service/league/admin-league';

@Component({
  selector: 'app-league-configs',
  templateUrl: './league-configs.component.html',
  styleUrls: ['./league-configs.component.css']
})
export class LeagueConfigsComponent implements OnInit {

  @Input() league: AdminLeague;
  private validConfigs = [
    'FREE_AGENCY_LOCKED',
    'MAX_PLAYERS',
  ];

  isValid(config: string) {
    return this.validConfigs.includes(config);
  }

  getInputType(config: string) {
    if (config === 'FREE_AGENCY_LOCKED') {
      return 'boolean';
    }
    return 'input';
  }

  getPlaceholder(config: string) {
    if (config === 'FREE_AGENCY_LOCKED') {
      return 'Free agency trancada';
    }

    if (config === 'MAX_PLAYERS') {
      return 'Limite de jogadores';
    }

    return config;
  }

  onSave(configs: AdminLeagueConfig[]) {
    console.warn('saving', configs);
  }

  constructor() { }

  ngOnInit() {
    this.league.configs.forEach(config => {
      if (this.getInputType(config.id_config) === 'boolean') {
        config.config_value = config.config_value === '1';
      }
    });
  }

}
