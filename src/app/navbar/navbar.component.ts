import { Component } from '@angular/core';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  searchIcon: IconDefinition = faSearch;

  constructor() { }

}
