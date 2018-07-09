import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BaseAdminDraft, AdminDraft } from '../../service/draft/admin-draft';
import { MatTableDataSource } from '@angular/material';
import { AdminDraftType } from '../../service/draft/admin-draft.service';
import { SystemService } from '../../service/system/system.service';
import { Observable } from 'rxjs';
import { AdminSeason } from '../../service/system/system';
import { compare } from '../../../../lib/utils';

@Component({
  selector: 'app-admin-draft-list',
  templateUrl: './admin-draft-list.component.html',
  styleUrls: ['./admin-draft-list.component.css']
})
export class AdminDraftListComponent implements OnChanges {

  @Input() drafts: BaseAdminDraft[];
  @Output() selection = new EventEmitter<BaseAdminDraft>();
  @Output() creation = new EventEmitter<{season: AdminSeason; id_type: AdminDraftType}>();
  @Output() delete = new EventEmitter<BaseAdminDraft>();

  dataSource = new MatTableDataSource<BaseAdminDraft>();
  displayedColumns = ['year', 'type', 'remove'];
  footerColumns = ['add-copy', 'type', 'season', 'create'];

  season: AdminSeason;
  type: AdminDraftType;
  seasons$: Observable<AdminSeason[]>;

  get isValid() {
    return this.season !== undefined && this.type !== undefined;
  }

  getType(type: AdminDraftType) {
    if (type === AdminDraftType.ROOKIES) {
      return 'Rookies';
    }
    return 'Geral';
  }

  onCreate() {
    if (this.isValid) {
      this.creation.emit({ season: this.season, id_type: this.type });
    }
  }

  onClick(draft: BaseAdminDraft) {
    this.selection.emit(draft);
  }

  onRemove(draft: BaseAdminDraft) {
    this.delete.emit(draft);
  }

  constructor(private system: SystemService) { }

  ngOnChanges() {
    this.seasons$ = this.system.seasons$;
    this.dataSource.data = this.drafts.sort((a, b) => compare(a.year_draft, b.year_draft, true));
  }

}
