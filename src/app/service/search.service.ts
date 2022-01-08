import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private sampleContent =
    {
      id: "X40Tr3Q-BvE",
      thumbnail: "assets/thumbnails/small-movie1.jpg",
      title: "La Casa de Papel",
      date: "28/8/20",
      category: "Entretenimiento",
      description: "Una banda organizada de ladrones se propone cometer el atraco del siglo en la Fábrica Nacional de Moneda y Timbre. Cinco meses de preparación quedarán reducidos a once días para poder llevar a cabo con éxito el gran golpe."
    }

  constructor() { }

  searchContent(query: string): Observable<any[]> {
    const resutls = Array(10).fill(this.sampleContent)
    return of(resutls);
  }

  relatedContent(to: string): Observable<any[]> {
    const resutls = Array(10).fill(this.sampleContent)
    return of(resutls);
  }
}
