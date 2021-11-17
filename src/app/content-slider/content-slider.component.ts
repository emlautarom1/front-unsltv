import { Component, Input, ViewEncapsulation } from "@angular/core";
import SwiperCore, { Mousewheel, Navigation } from "swiper";

SwiperCore.use([Navigation]);

@Component({
  selector: 'app-content-slider',
  templateUrl: './content-slider.component.html',
  styleUrls: ['./content-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ContentSliderComponent {
  @Input() contentName: string = "";
  urls: string[] = [
    "assets/thumbnails/small-movie1.jpg"
    , "assets/thumbnails/small-movie2.jpg"
    , "assets/thumbnails/small-movie3.jpg"
    , "assets/thumbnails/small-movie4.jpg"
    , "assets/thumbnails/small-movie5.jpg"
    , "assets/thumbnails/small-movie6.jpg"
    , "assets/thumbnails/small-movie7.jpg"
    , "assets/thumbnails/small-movie8.jpg"
  ]

  constructor() { }
}
