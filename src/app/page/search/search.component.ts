import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, take, tap, toArray } from 'rxjs/operators';
import { SearchParams } from 'src/app/model/search';
import { Video } from 'src/app/model/video';
import { YoutubeService } from 'src/app/service/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  title$!: Observable<string>;
  results$!: Observable<Video[]>;

  constructor(
    private route: ActivatedRoute,
    private youtube: YoutubeService
  ) { }

  ngOnInit(): void {
    const search$ = this.route.queryParamMap.pipe(
      map(params => { return { playlist: params.get("playlist"), query: params.get("query") } as SearchParams }),
      tap(search => console.log(search)),
      shareReplay(1)
    )

    this.title$ = search$.pipe(map(search => {
      switch (search.playlist) {
        case 'institutional':
          return "Institucional";
        case 'live':
          return "Emisiones pasadas";
        default:
          return `Resultados para '${search.query}'`;
      }
    }))

    this.results$ = search$.pipe(
      // TODO: Por ahora mostramos solo los primeros 10 resultados
      // En un futuro evaluar la posibilidad de agregar paginación (botón de 'Mas resultados')
      switchMap(search => this.youtube.searchFor(search).pipe(take(10), toArray()))
    );
  }

}
