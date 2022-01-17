import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from 'src/app/service/youtube.service';
import { map, mergeMap, Observable, share } from 'rxjs';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  video!: Observable<Video>;
  videoURL!: Observable<SafeResourceUrl>;
  relatedContent!: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private youtube: YoutubeService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    let videoID = this.route.paramMap.pipe(map(m => m.get("id") ?? ""))

    this.video = videoID.pipe(mergeMap(id => this.youtube.getVideoByID(id)), share())
    this.videoURL = videoID.pipe(
      map(v => `https://www.youtube.com/embed/${v}`),
      map(url => this.domSanitizer.bypassSecurityTrustResourceUrl(url))
    );

    // TODO: Usar videos relacionados reales
    this.relatedContent = videoID.pipe(
      mergeMap(id => this.youtube.findRelatedTo(id)),
      map(relatedContent => relatedContent.slice(0, 4)));
  }
}
