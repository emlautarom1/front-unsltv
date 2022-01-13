import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'youtubeCategory'
})
export class YoutubeCategoryPipe implements PipeTransform {
  private categories: { [id: string]: string } = {
    "1": "Cine y animaciones",
    "2": "Automovilismo",
    "10": "Música",
    "15": "Mascotas y animales",
    "17": "Deportes",
    "18": "Cortometrajes",
    "19": "Viajes y eventos",
    "20": "Videojuegos",
    "21": "Blogs de videos",
    "22": "Personas y blogs",
    "23": "Comedia",
    "24": "Entretenimiento",
    "25": "Noticias y política",
    "26": "Instructivos y estilo",
    "27": "Educación",
    "28": "Ciencia y tecnología",
    "30": "Películas",
    "31": "Anime/animación",
    "32": "Acción/aventura",
    "33": "Clásicos",
    "34": "Comedia",
    "35": "Documental",
    "36": "Drama",
    "37": "Familia",
    "38": "Extranjeras",
    "39": "Terror",
    "40": "Ciencia ficción/fantasía",
    "41": "Suspenso",
    "42": "Cortos",
    "43": "Programas",
    "44": "Trailers"
  }

  transform(value?: string, def: string = "Desconocido"): string {
    return this.categories[value ?? ""] ?? def;
  }

}
