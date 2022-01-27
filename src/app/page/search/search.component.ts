import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay, startWith, switchMap, take, tap, toArray } from 'rxjs/operators';
import { SearchParams } from 'src/app/model/search';
import { Video } from 'src/app/model/video';
import { Controls, SortBy } from './search-controls'
import { YoutubeService } from 'src/app/service/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  title$!: Observable<string>;
  results$!: Observable<Video[]>;
  controlsForm!: FormGroup;

  private initialControls: Controls = {
    sortBy: "publishedAt",
    filterDate: "any"
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private youtube: YoutubeService
  ) { }

  ngOnInit(): void {
    this.controlsForm = this.formBuilder.group(this.initialControls);
    const controls$ = this.controlsForm.valueChanges.pipe<Controls>(startWith(this.initialControls));

    const search$ = this.route.queryParamMap.pipe(
      map(params => { return { playlist: params.get("playlist"), query: params.get("query") } as SearchParams }),
      tap(search => console.log(search)),
      shareReplay(1)
    );

    this.title$ = search$.pipe(map(search => {
      switch (search.playlist) {
        case 'institutional':
          return "Institucional";
        case 'live':
          return "Emisiones pasadas";
        default:
          return `Resultados para '${search.query}'`;
      }
    }));

    this.results$ = combineLatest([search$, controls$]).pipe(
      switchMap(([search, controls]) => this.youtube.searchFor(search).pipe(
        // TODO: Por ahora mostramos solo los primeros 10 resultados
        // En un futuro evaluar la posibilidad de agregar paginación (botón de 'Mas resultados')
        take(10), toArray(),
        map(videos => videos.sort(this.sortBy(controls.sortBy)))
      ))
    );
  }

  sortBy(by: SortBy): (a: Video, b: Video) => number {
    function compare<T>(a: T, b: T) {
      if (a < b) { return -1; }
      if (a > b) { return 1; }
      return 0;
    }

    switch (by) {
      case 'publishedAt':
        return (a, b) =>
          compare(new Date(a.contentDetails.videoPublishedAt), new Date(b.contentDetails.videoPublishedAt))
      case 'title':
        return (a, b) =>
          compare(new Date(a.snippet.title), new Date(b.snippet.title))
    }
  }
}
