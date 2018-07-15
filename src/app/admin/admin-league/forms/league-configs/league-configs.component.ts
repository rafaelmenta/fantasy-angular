import { Component, OnInit, Input } from '@angular/core';
import { AdminLeague, AdminLeagueConfig } from '../../../service/league/admin-league';
import { AdminLeagueService } from '../../../service/league/admin-league.service';
import { MatSnackBar } from '../../../../../../node_modules/@angular/material';

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
    const saveConfigs = configs.map(config => {
      const saveConfig = {...config};
      if (this.getInputType(config.id_config) === 'boolean') {
        saveConfig.config_value = config.config_value ? '1' : '0';
      }
      return saveConfig;
    });
    this.leagueService.saveConfigs(this.league.id_league, saveConfigs).subscribe(res => {
      if (res.saveConfigs) {
        this.snackbar.open('Configurações salvas', null, {duration: 3000});
      }
    });
  }

  constructor(private leagueService: AdminLeagueService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.league.configs.forEach(config => {
      if (this.getInputType(config.id_config) === 'boolean') {
        config.config_value = config.config_value === '1';
      }
    });
  }

}
