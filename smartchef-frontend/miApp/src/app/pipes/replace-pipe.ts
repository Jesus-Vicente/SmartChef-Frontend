import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace',
  standalone: true // Importante para componentes standalone
})
export class ReplacePipe implements PipeTransform {

  transform(value: string, search: string, replace: string): string {
    if (!value) {
      return value;
    }
    // Reemplaza todas las ocurrencias usando una expresión regular global
    return value.replace(new RegExp(search, 'g'), replace);
  }
}
