import { Component, OnInit } from '@angular/core';
import { UserService, User, UserPermission } from '../../services/user.service';

@Component({
  selector: 'app-admin-summary',
  templateUrl: './admin-summary.component.html',
  styleUrls: ['./admin-summary.component.css']
})
export class AdminSummaryComponent implements OnInit {

  user: User;

  displayedColumns = ['action', 'admin', 'commissioner', 'updater', 'user'];
  dataSource = [
    {
      action: 'Alterar informações da própria equipe',
      user: true,
      updater: true,
      commissioner: true,
      admin: true,
    },
    {
      action: 'Abrir e fechar rodadas',
      user: false,
      updater: true,
      commissioner: true,
      admin: true,
    },
    {
      action: 'Atualizar boxscore de jogos da NBA',
      user: false,
      updater: true,
      commissioner: true,
      admin: true,
    },
    {
      action: 'Alterar configurações da liga',
      user: false,
      updater: false,
      commissioner: true,
      admin: true,
    },
    {
      action: 'Criar jogos da liga',
      user: false,
      updater: false,
      commissioner: true,
      admin: true,
    },
    {
      action: 'Gerenciar draft da liga',
      user: false,
      updater: false,
      commissioner: true,
      admin: true,
    },
    {
      action: 'Gerenciar jogadores',
      user: false,
      updater: false,
      commissioner: true,
      admin: true,
    },
    {
      action: 'Gerenciar equipes da liga',
      user: false,
      updater: false,
      commissioner: true,
      admin: true,
    },
    {
      action: 'Alterar calendário de jogos da NBA',
      user: false,
      updater: false,
      commissioner: true,
      admin: true,
    },
    {
      action: 'Criar usuários',
      user: false,
      updater: false,
      commissioner: false,
      admin: true,
    },
    {
      action: 'Criar ligas',
      user: false,
      updater: false,
      commissioner: false,
      admin: true,
    },
    {
      action: 'Trocar temporada',
      user: false,
      updater: false,
      commissioner: false,
      admin: true,
    },
  ];

  constructor(private userService: UserService) { }

  getUserPermission() {
    if (this.user.id_permission === UserPermission.ADMIN) {
      return 'Admin';
    }

    if (this.user.id_permission === UserPermission.COMMISSIONER) {
      return 'Comissário';
    }

    if (this.user.id_permission === UserPermission.UPDATER) {
      return 'Atualizador';
    }

    return 'Usuário';
  }

  ngOnInit() {
    this.userService.user.subscribe(nextUser => this.user = nextUser);
  }
}
