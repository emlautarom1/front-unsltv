import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/model/video';
import { VideoThumbnailService } from 'src/app/service/video-thumbnail.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input()
  video!: Video
  thumbnailURL: string = ""

  constructor(private thumbnails: VideoThumbnailService) { }

  ngOnInit(): void {
    this.thumbnailURL = this.thumbnails.getVideoThumbnail(this.video).url;
  }

}
