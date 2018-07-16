import { AdminDraftType, AdminDraftStatus } from './admin-draft.service';
import { AdminTeam } from '../team/admin-team';

export interface BaseAdminDraft {
  id_draft: number;
  year_draft: number;
  status_draft: AdminDraftStatus;
}

interface AdminDraftTeam extends AdminTeam {
  slug: string;
  symbol: string;
}

export interface AdminPick {
  id_pick: number;
  round: number;
  order: number;
  deadline: string;
  date?: string;
  time?: string;
  is_used: boolean;
  id_player: number;
  original: AdminDraftTeam;
  owner: AdminDraftTeam;
}

export interface AdminDraft extends BaseAdminDraft {
  id_league: number;
  draft_type: AdminDraftType;
  season: {year: number};
  picks: AdminPick[];
}

export interface AdminDraftInput {
  id_league: number;
  id_season: number;
  year_draft: number;
  status_draft: AdminDraftStatus;
  draft_type: AdminDraftType;
}
