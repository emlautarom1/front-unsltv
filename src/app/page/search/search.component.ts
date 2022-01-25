import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap, take, toArray } from 'rxjs/operators';
import { YoutubeService } from 'src/app/service/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results$!: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private youtube: YoutubeService
  ) { }

  ngOnInit(): void {
    this.results$ = this.route.paramMap.pipe(
      map(m => m.get("query") ?? ""),
      mergeMap(query => this.youtube.searchFor(query)),
      take(10),
      toArray()
    );
  }

}
