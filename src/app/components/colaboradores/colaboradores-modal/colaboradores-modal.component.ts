import { Colaborador } from './../../../Models/colaboradores.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { ColaboradoresService } from '../../../services/colaboradores.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-colaboradores-modal',
  templateUrl: './colaboradores-modal.component.html',
  styleUrls: ['./colaboradores-modal.component.css']
})
export class ColaboradoresModalComponent implements OnInit {

colaboradorform!:FormGroup;
data:undefined|Colaborador[];



  constructor(private FormBuilder:FormBuilder, private Colaborador:ColaboradoresService, private router:Router){

  }

  ngOnInit(): void {
    this.colaboradorform = this.FormBuilder.group({
      primernombre:['',Validators.required],
      primerapellido:['',Validators.required],
      dni:['',Validators.required],
      fechanacimiento:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',Validators.required]

    })

  }

  addcolaborador(data:Colaborador){
    this.Colaborador.PostColaborador(data).subscribe( res=>{
      this.colaboradorform.reset();
    });

  }
  exit() {
    location.reload();
  }


}
