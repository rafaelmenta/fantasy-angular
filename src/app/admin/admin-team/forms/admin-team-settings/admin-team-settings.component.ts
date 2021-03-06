import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminTeamInfo, AdminTeamInfoInput } from '../../../service/team/admin-team';
import { AdminUserService } from '../../../service/user/admin-user.service';
import { map, debounceTime, switchMap, startWith, tap } from 'rxjs/operators';
import { compare } from '../../../../../lib/utils';
import { AdminUser } from '../../../service/user/admin-user';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SystemService } from '../../../service/system/system.service';
import { AdminDivision } from '../../../service/league/admin-league';
import { AdminLeagueService } from '../../../service/league/admin-league.service';
import { AdminTeamService } from '../../../service/team/admin-team.service';
import { MatSnackBar } from '@angular/material';
import { AdminUploadService } from '../../../service/admin-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-team-settings',
  templateUrl: './admin-team-settings.component.html',
  styleUrls: ['./admin-team-settings.component.css']
})
export class AdminTeamSettingsComponent implements OnInit {
  @Input() team: AdminTeamInfo;
  @Output() update = new EventEmitter<AdminTeamInfoInput>();

  slugForm: FormGroup = this.fb.group({slug: ''});

  users$: Observable<AdminUser[]>;
  divisions$: Observable<AdminDivision[]>;
  refresh: string;
  validImage: boolean;

  loadUsers() {
    this.users$ = this.user.getUsers().pipe(
      map(users => users.sort((a, b) => compare(a.nickname, b.nickname, true)))
    );
  }

  loadDivisions() {
    this.divisions$ = this.league.getLeagueDivisions(this.team.division.conference.league.id_league)
      .pipe(map(divisions => divisions.sort((a, b) => compare(a.name, b.name, true))));
  }

  onSlugChange() {
    const control = this.slugForm.get('slug');
    control.valueChanges.pipe(
      startWith(this.team.slug),
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

  onSave() {
    const control = this.slugForm.get('slug');

    const city = this.team.city;
    const nickname = this.team.nickname;
    const id_user = this.team.users[0].id_user;
    let slug;
    if (control.hasError('notUnique') || !control.value) {
      slug = this.team.slug;
    } else {
      slug = control.value;
    }
    const id_division = this.team.division.id_division;
    const id_sl = this.team.id_sl;

    const team = {id_sl, city, nickname, id_user, slug, id_division};
    this.teamService.saveTeamInfo(team).subscribe(res => {
      if (res.updateTeamInfo) {
        this.snackbar.open('Time atualizado', null, {duration: 3000});
        this.update.emit(team);
      }
    });
  }

  selectFile(destination, $event) {
    this.uploadFile(destination, $event.target.files);
  }

  uploadFile(destination: string, files: FileList) {
    if (files.length === 0) {
      console.log('No file selected!');
      return;
    }

    this.validImage = true;
    const file: File = files[0];

    if (file) {
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        window.URL.revokeObjectURL(img.src);

        if (width !== 195 || height !== 135) {
          this.validImage = false;
        }

        if (file.type !== 'image/png') {
          this.validImage = false;
        }

        if (this.validImage) {
          this.upload.uploadFile(destination, file, `${this.team.id_sl}.png`).subscribe(
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
              this.snackbar.open('Foto salva', null, { duration: 3000 });
              this.refresh = `?refresh=${Date.now()}`;
            }
          );
        }
      };
    }
  }

  constructor(
    private user: AdminUserService,
    private system: SystemService,
    private snackbar: MatSnackBar,
    private upload: AdminUploadService,
    private teamService: AdminTeamService,
    private league: AdminLeagueService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.loadUsers();
    this.loadDivisions();
    this.onSlugChange();
  }

}
