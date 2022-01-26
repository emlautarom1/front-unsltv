import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap, toArray } from 'rxjs/operators';
import { Video } from 'src/app/model/video';
import { YoutubeService } from 'src/app/service/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  results$!: Observable<Video[]>;

  constructor(
    private route: ActivatedRoute,
    private youtube: YoutubeService
  ) { }

  ngOnInit(): void {
    this.results$ = this.route.paramMap.pipe(
      map(m => m.get("query") ?? ""),
      tap(query => console.log("query: " + query)),
      // TODO: Por ahora mostramos solo los primeros 10 resultados
      // En un futuro evaluar la posibilidad de agregar paginación (botón de 'Mas resultados')
      switchMap(query => this.youtube.searchFor(query).pipe(take(10), toArray()))
    );
  }

}
