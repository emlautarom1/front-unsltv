import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { Video } from '../model/video';

@Injectable({
  providedIn: 'root'
})
export class FuzzySearchService {
  private REGEX = new RegExp(/[\W_]+/g);

  constructor() { }

  matchesVideo(query: string, video: Video, threshold: number = 0.4): boolean {
    // Elimina caracteres no alfanuméricos
    let cleanQuery = query.replace(this.REGEX, " ");

    const fuse = new Fuse([video], {
      keys: ["snippet.title"],
      threshold
    })
    let matches = fuse.search(cleanQuery);
    return matches.length > 0
  }
}
