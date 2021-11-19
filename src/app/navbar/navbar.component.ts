import { Component, OnInit } from '@angular/core';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { distinct, distinctUntilChanged, fromEvent, map, Observable, startWith, Subscriber } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchIcon: IconDefinition = faSearch;
  didScroll!: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {
    this.didScroll = fromEvent(window, "scroll").pipe(
      startWith(false),
      map(() => window.scrollY > 50),
      distinctUntilChanged());
  }

}
