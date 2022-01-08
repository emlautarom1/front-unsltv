import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private _sampleContent =
    {
      id: "X40Tr3Q-BvE",
      thumbnail: "assets/thumbnails/small-movie1.jpg",
      title: "La Casa de Papel",
      date: "28/8/20",
      category: "Entretenimiento",
      views: "7.893.163",
      description: "Una banda organizada de ladrones se propone cometer el atraco del siglo en la Fábrica Nacional de Moneda y Timbre. Cinco meses de preparación quedarán reducidos a once días para poder llevar a cabo con éxito el gran golpe."
    }

  constructor() { }

  private _placeholder(): Observable<any[]> {
    const results = Array(10).fill(this._sampleContent)
    return of(results);
  }

  searchContent(query: string): Observable<any[]> {
    return this._placeholder()
  }

  relatedContent(to: string): Observable<any[]> {
    return this._placeholder();
  }

  findByID(id: string): Observable<any> {
    return of(this._sampleContent);
  }

  findRelatedTo(id: string): Observable<any[]> {
    return this._placeholder();
  }
}
