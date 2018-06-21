import { Injectable } from '@angular/core';

export interface Draft {
  id_draft: number;
  year_draft: number;
}

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  constructor() { }
}
