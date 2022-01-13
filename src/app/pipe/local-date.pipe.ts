import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {
  transform(value: string, def: string = ""): string {
    try {
      return new Date(value).toLocaleDateString();
    } catch (error) {
      return def;
    }
  }

}
