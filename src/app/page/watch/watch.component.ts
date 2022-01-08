import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from 'src/app/service/youtube.service';
import { map, mergeMap, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent implements OnInit {
  content!: Observable<any>;
  relatedContent!: Observable<any[]>;

  constructor(private route: ActivatedRoute, private youtube: YoutubeService) { }

  ngOnInit(): void {
    this.content = this.route.paramMap.pipe(
      map(m => m.get("id") ?? ""),
      tap(id => console.log(id)),
      mergeMap(id => this.youtube.findByID(id))
    )

    this.relatedContent = this.route.paramMap.pipe(
      map(m => m.get("id") ?? ""),
      mergeMap(id => this.youtube.findRelatedTo(id)),
      map(relatedContent => relatedContent.slice(0, 4)));
  }
}
