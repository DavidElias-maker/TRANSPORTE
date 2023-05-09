import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dni'
})
export class dnipipe implements PipeTransform {

  transform(value: string): string {

    const dni = value.replace(/\D/g, '');


    if (dni.length !== 13) {
      return value;
    }


    const primerosCuatro = dni.substr(0, 4);
    const segundosCuatro = dni.substr(4, 4);
    const ultimosCinco = dni.substr(8, 5);

    return `${primerosCuatro}-${segundosCuatro}-${ultimosCinco}`;
  }

}
