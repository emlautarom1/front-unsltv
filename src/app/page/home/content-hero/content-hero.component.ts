import { Component, OnInit } from '@angular/core';
import { faPlayCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { YoutubeService } from 'src/app/service/youtube.service';
import { map, Observable, share } from 'rxjs';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-content-hero',
  templateUrl: './content-hero.component.html',
  styleUrls: ['./content-hero.component.scss']
})
export class ContentHeroComponent implements OnInit {
  faPlayCircle = faPlayCircle;
  faInfoCircle = faInfoCircle;

  featuredVideo!: Observable<Video>;
  backgroundStyle!: Observable<{ 'background-image': string; }>;

  constructor(private youtube: YoutubeService) { }

  ngOnInit(): void {
    this.featuredVideo = this.youtube.getLatestVideo().pipe(share());
    this.backgroundStyle = this.featuredVideo.pipe(
      map(video => {
        let gradient = "360deg, #111 0%, rgba(255, 255, 255, 0) 25%";
        // TODO: Utilizar un placeholder real
        let thumbnail =
          video.snippet.thumbnails.maxres?.url
          ?? video.snippet.thumbnails.high?.url
          ?? "assets/thumbnails/banner.jpg";
        return { 'background-image': `linear-gradient(${gradient}), url('${thumbnail}')` }
      })
    );
  }
}
