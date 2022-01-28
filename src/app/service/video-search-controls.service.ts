import { Injectable } from '@angular/core';
import { Video } from '../model/video';
import { SortBy } from '../model/video-search-controls';

@Injectable({
  providedIn: 'root'
})
export class VideoSearchControlsService {

  constructor() { }

  private compare<T>(a: T, b: T) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
  }

  buildVideoComparator(by: SortBy): (a: Video, b: Video) => number {
    switch (by) {
      case 'publishedAt':
        return (a, b) =>
          this.compare(new Date(a.contentDetails.videoPublishedAt), new Date(b.contentDetails.videoPublishedAt))
      case 'title':
        return (a, b) =>
          this.compare(new Date(a.snippet.title), new Date(b.snippet.title))
    }
  }
}
