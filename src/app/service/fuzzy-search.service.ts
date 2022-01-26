import { Injectable } from '@angular/core';
import Fuse from 'fuse.js';
import { Video } from '../model/video';

@Injectable({
  providedIn: 'root'
})
export class FuzzySearchService {

  constructor() { }

  matchesVideo(query: string, video: Video): boolean {
    const fuse = new Fuse([video], {
      keys: ["snippet.title", "snippet.description"],
    })
    let matches = fuse.search(query);
    return matches.length > 0
  }
}
