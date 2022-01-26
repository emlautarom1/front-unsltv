import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconDefinition, faSearch } from '@fortawesome/free-solid-svg-icons';
import { distinctUntilChanged, fromEvent, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchIcon: IconDefinition = faSearch;
  didScroll!: Observable<boolean>;
  searchForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.didScroll = fromEvent(window, "scroll").pipe(
      startWith(false),
      map(() => window.scrollY > 50),
      distinctUntilChanged());

    this.searchForm = this.formBuilder.group({
      "query": ""
    });
  }

  onSubmit() {
    // TODO: Prevenir navegacion cuando la query está vacía.
    const query = this.searchForm.value.query
    this.router.navigate(["/search"], { queryParams: { query }});
  }
}
