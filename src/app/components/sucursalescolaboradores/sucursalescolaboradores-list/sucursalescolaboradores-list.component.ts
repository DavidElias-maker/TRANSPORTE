import { Component } from '@angular/core';

import { Pipe, PipeTransform } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { data } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Sucursal_Colaborador } from 'src/app/Models/sucursal_colaboradores.model';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { Sucursal_ColaboradorService } from 'src/app/services/sucursal_colaboradores.service';




@Component({
  selector: 'app-sucursalescolaboradores-list',
  templateUrl: './sucursalescolaboradores-list.component.html',
  styleUrls: ['./sucursalescolaboradores-list.component.css']
})
export class SucursalescolaboradoresListComponent {
  public sucursalescolaboradores: Sucursal_Colaborador[] = [];
  searchText: any;
  p:number = 1;
  data:undefined|Sucursal_Colaborador[];
  sucursalcolaboradorUpdateform!:FormGroup;
  ColObj : Sucursal_Colaborador = new Sucursal_Colaborador();

  constructor( private FormBuilder:FormBuilder,private SucursalesServicio:SucursalesService,private router: Router, private route:ActivatedRoute,private EventEmitterServicio: EventEmitterService, public sucursalescolaboradoresservicio: Sucursal_ColaboradorService) {




}

ObtenerAllsucursalescolaboradores(){
  this.sucursalescolaboradoresservicio.getAllSucursalColaborador()
    .subscribe(SucursalescolaboradoresRecibidos => {
      this.sucursalescolaboradores = SucursalescolaboradoresRecibidos;

    });
  }

ngOnInit(): void {

  this.ObtenerAllsucursalescolaboradores()
  this.sucursalcolaboradorUpdateform = this.FormBuilder.group({
    id:[''],
    nombre:['',Validators.required,],
    nombreCompleto:['',Validators.required],
    distanciaKm:['',Validators.required]
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



edit(data: Sucursal_Colaborador) {

  this.ColObj.id = data.id;
  this.sucursalcolaboradorUpdateform.controls['nombre'].setValue(data.nombre);
  this.sucursalcolaboradorUpdateform.controls['nombreCompleto'].setValue(data.nombreCompleto);
  this.sucursalcolaboradorUpdateform.controls['distanciaKm'].setValue(data.distanciaKm);


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

      this.ColObj.nombre = this.sucursalcolaboradorUpdateform.value.nombre;
      this.ColObj.nombreCompleto = this.sucursalcolaboradorUpdateform.value.nombreCompleto;
      this.ColObj.distanciaKm = this.sucursalcolaboradorUpdateform.value.distanciaKm;



this.sucursalescolaboradoresservicio.updateSucursalcolaboradores(this.ColObj).subscribe(res =>{
  this.sucursalcolaboradorUpdateform.reset();
  this.ObtenerAllsucursalescolaboradores()
});

    } else if (result.isDenied) {
      Swal.fire('Se cancelo la accion de Actualizar', '', 'info')
    }
  })

}

deletesucursalcolaborador(data:Sucursal_Colaborador){

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
