import { Injectable } from '@angular/core';
import { Video } from '../model/video';
import { FilterDate, SortBy } from '../model/video-search-controls';

@Injectable({
  providedIn: 'root'
})
export class VideoSearchControlsService {
  private MILLIS_IN_HOUR = 1000 * 60 * 60;

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

  buildVideoFilterByDate(date: FilterDate): (a: Video) => boolean {
    function getVideoDate(v: Video): Date { return new Date(v.contentDetails.videoPublishedAt); };
    function millisSinceNow(date: Date) { return Math.abs(Date.now() - date.valueOf()); }

    if (date == 'any') { return (_) => true; }

    let timeFrame: number;
    switch (date) {
      case 'day':
        timeFrame = this.MILLIS_IN_HOUR * 24;
        break;
      case 'week':
        timeFrame = this.MILLIS_IN_HOUR * 24 * 7;
        break;
      case 'month':
        timeFrame = this.MILLIS_IN_HOUR * 24 * 30;
        break;
      case 'year':
        timeFrame = this.MILLIS_IN_HOUR * 24 * 365;
        break;
    }
    return (v) => millisSinceNow(getVideoDate(v)) <= timeFrame;
  }
}
