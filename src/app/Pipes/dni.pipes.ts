import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dni'
})
export class dnipipe implements PipeTransform {

  transform(value: string): string {
    // Eliminamos cualquier caracter que no sea un número
    const dni = value.replace(/\D/g, '');

    // Comprobamos que el número de DNI tenga una longitud válida
    if (dni.length !== 13) {
      return value;
    }

    // Obtenemos el número de DNI con el formato ####-####-#####
    const primerosCuatro = dni.substr(0, 4);
    const segundosCuatro = dni.substr(4, 4);
    const ultimosCinco = dni.substr(8, 5);

    return `${primerosCuatro}-${segundosCuatro}-${ultimosCinco}`;
  }

}
