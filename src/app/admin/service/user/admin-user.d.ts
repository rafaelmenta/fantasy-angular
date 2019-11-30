export interface AdminUser {
  id_user: number;
  nickname: string;
  login: string;
  password?: string;
  teams: {
    id_sl: number;
    default_team: boolean;
  }
}