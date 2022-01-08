import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { YoutubeService } from 'src/app/service/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results!: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private youtube: YoutubeService
  ) { }

  ngOnInit(): void {
    this.results = this.route.paramMap.pipe(
      map(m => m.get("query") ?? ""),
      tap(query => console.log("query = ", query)),
      mergeMap(query => this.youtube.searchContent(query)));
  }

}
