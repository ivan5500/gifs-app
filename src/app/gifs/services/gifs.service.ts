import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../models/gifs.interface';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private _apiKey: string = '1BLWyQMTIqxB1qBcWam16Cxj4SAcoFQQ';
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }
  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this.tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
  get tagsHistory() {
    return [...this._tagsHistory];
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this._serviceUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp);
        this.gifList = resp.data;
        console.log(this.gifList);
      });
  }
}
