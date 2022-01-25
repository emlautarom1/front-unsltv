import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  @Input()
  video!: Video
  thumbnailURL: string = ""

  constructor() { }

  ngOnInit(): void {
    // TODO: Extraer lógica a servicio
    let thumbnails = this.video.snippet.thumbnails;
    this.thumbnailURL = thumbnails.maxres?.url ?? thumbnails.high?.url ?? ""
  }

}
