import { Component, OnInit, Input } from '@angular/core';
import { AdminLeague, AdminLeagueConfig } from '../../../service/league/admin-league';
import { AdminLeagueService } from '../../../service/league/admin-league.service';
import { MatSnackBar } from '@angular/material';

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
    'SALARY_CAP',
    'AUCTION_ENABLED',
    'AUCTION_BID_INCREMENT',
    'AUCTION_BID_OFFSET_TIME',
    'AUCTION_MIN_BID',
    'AUCTION_MAX_BID',
  ];

  isValid(config: string) {
    return this.validConfigs.includes(config);
  }

  sortedConfigs(configs: AdminLeagueConfig[]) {
    return configs.sort(
      (a, b) => this.validConfigs.indexOf(a.id_config) < this.validConfigs.indexOf(b.id_config) ? -1 : 1,
    );
  }

  getInputType(config: string) {
    if (config === 'FREE_AGENCY_LOCKED' || config === 'AUCTION_ENABLED') {
      return 'boolean';
    }

    if (config === 'AUCTION_BID_INCREMENT' || config === 'AUCTION_MIN_BID' || config === 'AUCTION_MAX_BID') {
      return 'currency';
    }

    if (config === 'AUCTION_BID_OFFSET_TIME') {
      return 'time';
    }

    return 'input';
  }

  getPlaceholder(config: string) {

    switch (config) {
      case 'FREE_AGENCY_LOCKED': return 'Free agency trancada';
      case 'MAX_PLAYERS': return 'Limite de jogadores';
      case 'SALARY_CAP': return 'Salary Cap (em Milhões)';
      case 'AUCTION_ENABLED': return 'Leilão habilitado';
      case 'AUCTION_BID_OFFSET_TIME': return 'Prazo de vencimento';
      case 'AUCTION_BID_INCREMENT': return 'Incremento entre bids';
      case 'AUCTION_MIN_BID': return 'Lance mínimo';
      case 'AUCTION_MAX_BID': return 'Lance máximo';
      default: return config;
    }
  }

  onSave(configs: AdminLeagueConfig[]) {
    const saveConfigs = configs.map(config => {
      const saveConfig = {...config};
      if (this.getInputType(config.id_config) === 'boolean') {
        saveConfig.config_value = config.config_value ? '1' : '0';
      }
      saveConfig.config_value = String(saveConfig.config_value);
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

  timeFromMilis(value: string) {
    const milis = Number(value);

    if (isNaN(milis)) { return ''; }

    const hours = Math.floor(milis / 60 / 60 / 1000);
    const minutes = Math.floor((milis - (hours * 60 * 60 * 1000)) / 60 / 1000);
    const seconds = Math.floor((milis - (hours * 60 * 60 * 1000) - (minutes * 60 * 1000)) / 1000);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  timeToMilis($change: Event, config: AdminLeagueConfig) {
    const input = $change.target as HTMLInputElement;
    const time = input.value;

    const timeParts = time.split(':');

    if (timeParts.length !== 3) { return; }

    const hours = Number(timeParts[0]) * 60 * 60 * 1000;
    const minutes = Number(timeParts[1]) * 60 * 1000;
    const seconds = Number(timeParts[2]) * 1000;

    if (isNaN(hours) || isNaN (minutes) || isNaN(seconds)) { return; }

    config.config_value = String(hours + minutes + seconds);
  }

}
