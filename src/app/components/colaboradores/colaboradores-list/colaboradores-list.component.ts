import { Colaborador } from './../../../Models/colaboradores.model';
import { Component, OnInit } from '@angular/core';
import { ColaboradoresService } from '../../../services/colaboradores.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ColaboradoresUpdateComponent } from '../colaboradores-update/colaboradores-update.component';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { data } from 'jquery';







@Component({
  providers:[ColaboradoresUpdateComponent],
  selector: 'app-colaboradores-list',
  templateUrl: './colaboradores-list.component.html',
  styleUrls: ['./colaboradores-list.component.css'],


})




export class ColaboradoresListComponent implements OnInit{

  public colaboradores: Colaborador[] = [];
  searchText: any;
  p:number = 1;
  data:undefined|Colaborador[];
  colaboradorUpdateform!:FormGroup;




  constructor(private ColaboradoresService: ColaboradoresService, private FormBuilder:FormBuilder,private Colaborador:ColaboradoresService) {

    this.ColaboradoresService.getAllColaboradores()
      .subscribe(colaboradoresRecibidos => {
        this.colaboradores = colaboradoresRecibidos;

      });
}
ngOnInit(): void {

  this.colaboradorUpdateform = this.FormBuilder.group({
    primernombre:[,Validators.required,],
    primerapellido:['',Validators.required],
    dni:['',Validators.required],
    fechanacimiento:['',Validators.required],
    direccion:['',Validators.required],
    telefono:['',Validators.required]

  })

}


key:string = 'primerNombre';
reverse:boolean = false;
sort(key:any){
  this.key = key;
  this.reverse = !this.reverse;

}


edit(data: Colaborador) {
  this.colaboradorUpdateform.controls['primernombre'].setValue(data.primerNombre);
  this.colaboradorUpdateform.controls['primerapellido'].setValue(data.primerApellido);
  this.colaboradorUpdateform.controls['dni'].setValue(data.dni);
  this.colaboradorUpdateform.controls['fechanacimiento'].setValue(data.fechaNacimiento.toString().substring(0,10));
  this.colaboradorUpdateform.controls['direccion'].setValue(data.direccion);
  this.colaboradorUpdateform.controls['telefono'].setValue(data.telefono);

}

  updatecolaborador(data:Colaborador){



    this.Colaborador.UpdateColaborador(data,data.Id).subscribe( res=>{
      this.colaboradorUpdateform.reset();
    });


}


  }








