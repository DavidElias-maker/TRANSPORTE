import { Component } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { data } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Sucursal_ColaboradorGet } from 'src/app/Models/sucursal_colaboradores.modelGet';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { Sucursal_ColaboradorService } from 'src/app/services/sucursal_colaboradores.service';
import { Sucursal } from 'src/app/Models/sucursales.model';
import { Colaborador } from 'src/app/Models/colaboradores.model';
import { ColaboradorSucursal } from 'src/app/Models/colaboradoressucursales.model';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { Sucursal_Colaborador } from 'src/app/Models/sucursal_colaboradores.model';




@Component({
  selector: 'app-sucursalescolaboradores-list',
  templateUrl: './sucursalescolaboradores-list.component.html',
  styleUrls: ['./sucursalescolaboradores-list.component.css']
})
export class SucursalescolaboradoresListComponent {
  public sucursalescolaboradores: Sucursal_ColaboradorGet[] = [];
  public sucursales_colaboradores: Sucursal_Colaborador[] = [];
  public sucursales: Sucursal[] = [];
  public colaboradores: Colaborador[] = [];
  public colaboradoressucursales: ColaboradorSucursal[] = [];
  searchText: any;
  p:number = 1;
  data:undefined|Sucursal_ColaboradorGet[];
  data1:undefined|Sucursal_Colaborador[];
  sucursalcolaboradorUpdateform!:FormGroup;
  ColObj : Sucursal_ColaboradorGet = new Sucursal_ColaboradorGet();
  ColsucObj : Sucursal_Colaborador = new Sucursal_Colaborador();

  constructor( private FormBuilder:FormBuilder,private SucursalesServicio:SucursalesService,private router: Router, private route:ActivatedRoute,private EventEmitterServicio: EventEmitterService, public sucursalescolaboradoresservicio: Sucursal_ColaboradorService, private ColaboradoresServicio:ColaboradoresService) {




}

ObtenerAllsucursalescolaboradores(){
  this.sucursalescolaboradoresservicio.getAllSucursalColaborador()
    .subscribe(SucursalescolaboradoresRecibidos => {
      this.sucursalescolaboradores = SucursalescolaboradoresRecibidos;
      console.log(this.sucursalescolaboradores);
    });



  }

  ObtenerAllsucursales(){
    this.SucursalesServicio.getAllSucursales()
      .subscribe(SucursalesRecibidos => {
        this.sucursales = SucursalesRecibidos;

      });
    }

    ObtenerAllcolaboradorsucursal(){
      this.ColaboradoresServicio.GetColaboradorSucursal()
        .subscribe(SucursalescolaboradoresRecibidos => {
          this.colaboradoressucursales = SucursalescolaboradoresRecibidos;

        });


      }

ngOnInit(): void {
  this.ObtenerAllsucursales();
  this.ObtenerAllsucursalescolaboradores();
  this.ObtenerAllcolaboradorsucursal();


  this.sucursalcolaboradorUpdateform = this.FormBuilder.group({
    id:[''],
    distanciaKm:['',Validators.required],
    colaboradorId:[''],
    sucursalId:['']
  })
  if (this.EventEmitterServicio.subsvar==undefined) {
    this.EventEmitterServicio.subsvar = this.EventEmitterServicio.
    invokesucursaleslistcomponent.subscribe((name:string) => {
      this.ObtenerAllsucursalescolaboradores();
    });
  }

}
key:string = 'nombre';
reverse:boolean = false;
sort(key:any){
  this.key = key;
  this.reverse = !this.reverse;

}



edit(data1: Sucursal_Colaborador) {

  this.ColsucObj.id = data1.id;
  this.sucursalcolaboradorUpdateform.controls['sucursalId'].setValue(data1.sucursalId);
  this.sucursalcolaboradorUpdateform.controls['colaboradorId'].setValue(data1.colaboradorId);
  this.sucursalcolaboradorUpdateform.controls['distanciaKm'].setValue(data1.distanciaKm);


}


updatesucursalcolaborador(){

  Swal.fire({
    title: `Desea Actualizar la sucursal?`,
    showDenyButton: true,
    confirmButtonText: 'Actualizar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('!Actualizado con exito!', '', 'success')

      this.ColsucObj.sucursalId = this.sucursalcolaboradorUpdateform.value.sucursalId;
      this.ColsucObj.colaboradorId = this.sucursalcolaboradorUpdateform.value.colaboradorId;
      this.ColsucObj.distanciaKm = this.sucursalcolaboradorUpdateform.value.distanciaKm;



this.sucursalescolaboradoresservicio.updateSucursalcolaboradores(this.ColsucObj).subscribe(res =>{
  this.sucursalcolaboradorUpdateform.reset();
  this.ObtenerAllsucursalescolaboradores()
  console.log(this.ColsucObj)
});

    } else if (result.isDenied) {
      Swal.fire('Se cancelo la accion de Actualizar', '', 'info')
    }
  })

}

deletesucursalcolaborador(data:Sucursal_ColaboradorGet){

  Swal.fire({
    title: `Desea borrar la sucursal ${data.nombre}?`,
    showDenyButton: true,
    confirmButtonText: 'Borrar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('!Eliminado con exito!', '', 'success')

      this.sucursalescolaboradoresservicio.DeleteSucursalcolaborador(data)
      .subscribe(res => {
        this.ObtenerAllsucursalescolaboradores()
      })



    } else if (result.isDenied) {
      Swal.fire('Se cancelo la accion de Eliminar', '', 'info')
    }

  })
}
}
