import { Component } from '@angular/core';
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  socialNetworks = [
    faFacebookF
    , faInstagram
    , faTwitter
    , faYoutube
  ]

  constructor() { }
}
