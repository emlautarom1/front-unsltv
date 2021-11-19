import { Component, OnInit } from '@angular/core';
import { faPlayCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-content-hero',
  templateUrl: './content-hero.component.html',
  styleUrls: ['./content-hero.component.scss']
})
export class ContentHeroComponent {
  faPlayCircle = faPlayCircle;
  faInfoCircle = faInfoCircle;

  constructor() { }
}
