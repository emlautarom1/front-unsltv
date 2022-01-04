import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories = [
    "Estrenos"
    // , "Te recomendamos"
    // , "Ficción"
    // , "Cortitos y al pie"
    // , "Humor"
    // , "Música"
    // , "Existenciales"
    // , "Entrevistas"
    // , "Arte"
    // , "Animación"
    // , "Comunidad"
    // , "Amigos"
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
