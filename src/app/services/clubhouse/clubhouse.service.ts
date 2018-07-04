import { Injectable } from '@angular/core';
import { Team } from '../team.service';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubhouseService {

  teamSubject = new ReplaySubject<Team>(1);
  team = this.teamSubject.asObservable();

  constructor() {
  }
}
