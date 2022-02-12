import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeService } from 'src/app/service/youtube.service';
import { map, mapTo, mergeMap, Observable, scan, shareReplay, startWith, Subject, take, toArray } from 'rxjs';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  video$!: Observable<Video>;
  videoURL$!: Observable<SafeResourceUrl>;
  related$!: Observable<Video[]>;

  toggleButtonEvent$: Subject<Event> = new Subject();
  clampedDescription$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private youtube: YoutubeService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.clampedDescription$ = this.toggleButtonEvent$.pipe(
      mapTo(true),
      startWith(true),
      scan(current => !current)
    );

    let videoID$ = this.route.paramMap.pipe(
      map(m => m.get("id") ?? ""),
      shareReplay()
    );

    this.videoURL$ = videoID$.pipe(
      map(v => `https://www.youtube.com/embed/${v}`),
      map(url => this.domSanitizer.bypassSecurityTrustResourceUrl(url))
    );
    this.video$ = videoID$.pipe(
      mergeMap(id => this.youtube.getVideoByID(id)),
      shareReplay()
    );
    this.related$ = this.video$.pipe(
      mergeMap(v => this.youtube.findRelatedVideosTo(v).pipe(
        take(4), toArray()
      ))
    );
  }
}
