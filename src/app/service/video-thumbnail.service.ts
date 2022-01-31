import { Injectable } from '@angular/core';
import { Thumbnail } from '../model/thumbnail';
import { Video } from '../model/video';

@Injectable({
  providedIn: 'root'
})
export class VideoThumbnailService {
  private DEFAULT_THUMBNAIL: Thumbnail = {
    width: 1280,
    height: 720,
    url: "assets/thumbnails/placeholder.jpg"
  }

  constructor() { }

  getVideoThumbnail(video: Video): Thumbnail {
    let thumbnails = video.snippet.thumbnails;
    let bestThumbnail = thumbnails.maxres
      ?? thumbnails.high
      ?? thumbnails.medium
      ?? thumbnails.standard
      ?? thumbnails.default
      ?? this.DEFAULT_THUMBNAIL

    return bestThumbnail
  }

}
