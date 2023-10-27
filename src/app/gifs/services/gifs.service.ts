import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {
  constructor() {}

  private _tagsHistory: string[] = [];

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    this._tagsHistory.unshift(tag);
    console.log(this._tagsHistory);

  }
}
