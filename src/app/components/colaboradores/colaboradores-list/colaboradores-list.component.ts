import { Component, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/Models/colaboradores.model';
import { ColaboradoresService } from '../../../services/colaboradores.service';
import { FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-colaboradores-list',
  templateUrl: './colaboradores-list.component.html',
  styleUrls: ['./colaboradores-list.component.css'],


})




export class ColaboradoresListComponent implements OnInit {

  public colaboradores: Colaborador[] = [];

  constructor(private ColaboradoresService: ColaboradoresService) {

    this.ColaboradoresService.getAllColaboradores()
      .subscribe(colaboradoresRecibidos => {
        this.colaboradores = colaboradoresRecibidos;

      });

  }

  ngOnInit(): void
  {



  }


}



