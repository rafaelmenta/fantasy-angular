import { Injectable } from '@angular/core';
import { Subscription, Observable, Subscriber, BehaviorSubject } from 'rxjs';

export interface PlayerFilters {
  positions: string[];
  team: number;
  rookies: boolean;
  freeAgents: boolean;
  statColumns: [string[]];
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filtersBehaviorSubject = new BehaviorSubject<PlayerFilters>({} as PlayerFilters);
  public filters$ = this.filtersBehaviorSubject.asObservable();

  updateFilters(filters: PlayerFilters) {
    this.filtersBehaviorSubject.next(filters);
  }
}
