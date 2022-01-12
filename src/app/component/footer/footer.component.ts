import { Component } from '@angular/core';
import { faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  socialNetworks = [
    { icon: faFacebookF, url: "https://www.facebook.com/unsltv/" },
    { icon: faInstagram, url: "https://www.instagram.com/unsltv/" },
    { icon: faTwitter, url: "https://twitter.com/unsltv" },
    { icon: faYoutube, url: "https://www.youtube.com/channel/UCZZWwoQL1ZpRU-8hdsrUpew" }
  ]

  constructor() { }
}
