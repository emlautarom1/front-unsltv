import { Component, OnInit } from '@angular/core';
import { faPlayCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import { YoutubeService } from 'src/app/service/youtube.service';
import { VideoThumbnailService } from 'src/app/service/video-thumbnail.service';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-content-hero',
  templateUrl: './content-hero.component.html',
  styleUrls: ['./content-hero.component.scss']
})
export class ContentHeroComponent implements OnInit {
  faPlayCircle = faPlayCircle;
  faInfoCircle = faInfoCircle;

  featuredVideo$!: Observable<Video>;
  backgroundStyle$!: Observable<{ 'background-image': string; }>;

  constructor(
    private youtube: YoutubeService,
    private thumbnails: VideoThumbnailService
  ) { }

  ngOnInit(): void {
    this.featuredVideo$ = this.youtube.latestVideo$;
    this.backgroundStyle$ = this.featuredVideo$.pipe(
      map(video => {
        let gradient = "360deg, #111 0%, rgba(255, 255, 255, 0) 25%";
        let thumbnailURL = this.thumbnails.getVideoThumbnail(video).url;
        return { 'background-image': `linear-gradient(${gradient}), url('${thumbnailURL}')` }
      })
    );
  }
}
