import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, fromEvent, map, Observable, startWith } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchIcon = faSearch;
  didScroll$!: Observable<boolean>;
  searchForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.didScroll$ = fromEvent(window, "scroll").pipe(
      startWith(false),
      map(() => window.scrollY > 50),
      distinctUntilChanged()
    );

    this.searchForm = this.formBuilder.group({
      'query': ""
    });
  }

  onSubmit() {
    const query: string = this.searchForm.value.query;
    if (query.trim() != "") {
      this.router.navigate(["/search"], { queryParams: { query } });
    }
  }
}
