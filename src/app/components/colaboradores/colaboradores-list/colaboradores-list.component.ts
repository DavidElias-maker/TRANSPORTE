import { Component } from '@angular/core';
import { Colaborador } from 'src/app/Models/colaboradores.model';
import { ColaboradoresService } from '../../../services/colaboradores.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-colaboradores-list',
  templateUrl: './colaboradores-list.component.html',
  styleUrls: ['./colaboradores-list.component.css'],
  template: '<p>{{ colaborador.fechaNacimiento | date: "yyyy-MM-dd" }}</p>'
})
export class ColaboradoresListComponent {

  public colaboradores: Colaborador[] = [];

  constructor(private ColaboradoresService: ColaboradoresService) {

    this.ColaboradoresService.getAllColaboradores()
      .subscribe(colaboradoresRecibidos => {
        this.colaboradores = colaboradoresRecibidos;

      });


  }
}
