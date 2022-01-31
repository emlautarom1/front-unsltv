import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Observable, take, toArray } from "rxjs";
import { Playlist } from "src/app/model/playlist";
import { Video } from "src/app/model/video";
import { VideoThumbnailService } from "src/app/service/video-thumbnail.service";
import { YoutubeService } from "src/app/service/youtube.service";
import SwiperCore, { Navigation } from "swiper";

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-content-slider',
  templateUrl: './content-slider.component.html',
  styleUrls: ['./content-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentSliderComponent implements OnInit {
  @Input() playlist!: Playlist;
  maxNumOfVideos = 25;

  videos$!: Observable<Video[]>;

  constructor(
    private youtube: YoutubeService,
    private thumbnails: VideoThumbnailService
  ) { }

  ngOnInit(): void {
    this.videos$ = this.youtube.getVideosForPlaylist(this.playlist.id).pipe(
      take(this.maxNumOfVideos),
      toArray()
    );
  }

  videoThumbnailToBackgroundImage(video: Video): { 'background-image': string } {
    let url = this.thumbnails.getVideoThumbnail(video).url;
    return { "background-image": `url(${url})` }
  }

}
