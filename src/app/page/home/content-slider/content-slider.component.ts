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

  private sampleContent =
    {
      thumbnail: "assets/thumbnails/small-movie1.jpg",
      title: "La Casa de Papel",
      description: "Una banda organizada de ladrones se propone cometer el atraco del siglo en la Fábrica Nacional de Moneda y Timbre. Cinco meses de preparación quedarán reducidos a once días para poder llevar a cabo con éxito el gran golpe."
    }

  mediaContent = [
    { ...this.sampleContent, thumbnail: "assets/thumbnails/small-movie1.jpg" },
    { ...this.sampleContent, thumbnail: "assets/thumbnails/small-movie2.jpg" },
    { ...this.sampleContent, thumbnail: "assets/thumbnails/small-movie3.jpg" },
    { ...this.sampleContent, thumbnail: "assets/thumbnails/small-movie4.jpg" },
    { ...this.sampleContent, thumbnail: "assets/thumbnails/small-movie5.jpg" },
    { ...this.sampleContent, thumbnail: "assets/thumbnails/small-movie6.jpg" },
    { ...this.sampleContent, thumbnail: "assets/thumbnails/small-movie7.jpg" },
    { ...this.sampleContent, thumbnail: "assets/thumbnails/small-movie8.jpg" },
  ]

  constructor() { }
}
