import { Colaborador } from './../../../Models/colaboradores.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';

import { data } from 'jquery';



@Component({
  selector: 'app-colaboradores-update',
  templateUrl: './colaboradores-update.component.html',
  styleUrls: ['./colaboradores-update.component.css']
})
export class ColaboradoresUpdateComponent implements OnInit{
colaboradorUpdateform!:FormGroup;
data:undefined|Colaborador[];
constructor(private FormBuilder:FormBuilder){
}


  ngOnInit(): void {
    this.colaboradorUpdateform = this.FormBuilder.group({
      primernombre:['',Validators.required],
      primerapellido:['',Validators.required],
      dni:['',Validators.required],
      fechanacimiento:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',Validators.required]

    })

  }




  edit(data:Colaborador){
    this.colaboradorUpdateform.controls['primerNombre'].setValue(data.primerNombre)
    this.colaboradorUpdateform.controls['primerApellido'].setValue(data.primerApellido)
    this.colaboradorUpdateform.controls['dni'].setValue(data.dni)
    this.colaboradorUpdateform.controls['fechanacimiento'].setValue(data.fechaNacimiento)
    this.colaboradorUpdateform.controls['direccion'].setValue(data.direccion)
    this.colaboradorUpdateform.controls['telefono'].setValue(data.telefono)

  }

}
