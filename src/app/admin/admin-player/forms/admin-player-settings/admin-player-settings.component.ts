import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AdminPlayer } from '../../../service/player/admin-player';
import { FormGroup, FormBuilder } from '@angular/forms';
import { startWith, debounceTime, switchMap, tap } from 'rxjs/operators';
import { SystemService } from '../../../service/system/system.service';
import { Observable } from 'rxjs';
import { BaseAdminNBATeam } from '../../../service/system/system';
import { AdminPlayerService } from '../../../service/player/admin-player.service';
import { MatSnackBar } from '@angular/material';
import { AdminUploadService } from '../../../service/admin-upload.service';

@Component({
  selector: 'app-admin-player-settings',
  templateUrl: './admin-player-settings.component.html',
  styleUrls: ['./admin-player-settings.component.css']
})
export class AdminPlayerSettingsComponent implements OnInit {

  @Input() player: AdminPlayer;
  @Output() save = new EventEmitter<{ type: 'add' | 'update' | 'remove', player: AdminPlayer }>();

  slugForm: FormGroup = this.fb.group({ slug: '' });
  nbaTeams$: Observable<BaseAdminNBATeam[]>;

  refresh = '';

  onSlugChange() {
    const control = this.slugForm.get('slug');
    control.valueChanges.pipe(
      startWith(this.player.player_slug),
      debounceTime(300),
      switchMap(query => query ? this.system.getSlugCount(query) : Observable.create(0)),
      tap((res: number) => {
        if (res > 0) {
          control.setErrors({ 'notUnique': res > 0 });
        } else {
          control.setErrors(null);
        }
      })
    ).subscribe();
  }

  onRetire(player: AdminPlayer) {
    this.playerService.retirePlayer(player.id_player).subscribe(res => {
      if (res.retirePlayer) {
        this.save.emit({type: 'remove', player});
        this.snackbar.open('Jogador removido', null, {duration: 3000});
      }
    });
  }

  onSave(player: AdminPlayer) {
    const control = this.slugForm.get('slug');

    if (control.hasError('notUnique') || !control.value) {
      player.player_slug = this.player.player_slug;
    } else {
      player.player_slug = control.value;
    }

    const type = player.id_player ? 'update' : 'add';
    this.playerService.savePlayer(player).subscribe(res => {
      if (res.savePlayer) {
        player.id_player = res.savePlayer;
        this.save.emit({type, player});
        this.snackbar.open('Jogador salvo', null, {duration: 3000});
      }
    });
  }

  selectFile(event) {
    this.uploadFile(event.target.files);
  }

  uploadFile(files: FileList) {
    if (files.length === 0) {
      console.log('No file selected!');
      return;
    }

    const file: File = files[0];
    this.upload.uploadFile('headerPhoto', file, `${this.player.id_player}.jpg`).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`File is ${percentDone}% loaded.`);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely loaded!');
        }
      },
      (err) => {
        console.log('Upload Error:', err);
      }, () => {
        this.snackbar.open('Foto salva', null, {duration: 3000});
        this.refresh = `?refresh=${Date.now()}`;
      }
    );
  }

  constructor(
    private fb: FormBuilder,
    private system: SystemService,
    private snackbar: MatSnackBar,
    private upload: AdminUploadService,
    private playerService: AdminPlayerService
  ) { }

  ngOnInit() {
    this.onSlugChange();
    this.nbaTeams$ = this.system.nbaTeams$;
  }

}
