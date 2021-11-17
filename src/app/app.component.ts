import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  categories = [
    "Estrenos"
    , "Te recomendamos"
    , "Ficción"
    , "Cortitos y al pie"
    , "Humor"
    , "Música"
    , "Existenciales"
    , "Entrevistas"
    , "Arte"
    , "Animación"
    , "Comunidad"
    , "Amigos"
  ];

  constructor() { }
}
