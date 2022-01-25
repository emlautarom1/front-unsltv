import { Component, OnInit } from '@angular/core';
import { Observable, take, toArray } from 'rxjs';
import { Playlist } from 'src/app/model/playlist';
import { YoutubeService } from 'src/app/service/youtube.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playlists$!: Observable<Playlist[]>;

  constructor(private youtube: YoutubeService) { }

  ngOnInit(): void {
    this.playlists$ = this.youtube.allPlaylists$.pipe(take(1), toArray())
  }

}
