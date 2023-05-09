import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefono'
})
export class telefonopipe implements PipeTransform {

  transform(value: string): string {
    const telefono = value.replace(/\s/g, '').replace(/-/g, '');

    if (telefono.length !== 11) {
      return value;
    }
    const codigoPais = telefono.substr(0, 3);
    const prefijo = telefono.substr(3, 4);
    const sufijo = telefono.substr(7, 4);
    return `(${codigoPais}) ${prefijo}-${sufijo}`;
  }

}
