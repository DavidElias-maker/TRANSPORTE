import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/Models/sucursales.model';
import { Pipe, PipeTransform } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { data } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sucursales-list',
  templateUrl: './sucursales-list.component.html',
  styleUrls: ['./sucursales-list.component.css']
})
export class SucursalesListComponent implements OnInit , OnDestroy{
  public sucursales: Sucursal[] = [];
  searchText: any;
  p:number = 1;
  data:undefined|Sucursal[];
  sucursalUpdateform!:FormGroup;
  ColObj : Sucursal = new Sucursal();
  subscription: Subscription = new Subscription();
  constructor(private SucursalesService: SucursalesService, private FormBuilder:FormBuilder,private SucursalesServicio:SucursalesService,private router: Router, private route:ActivatedRoute,private EventEmitterServicio: EventEmitterService) {


}

ngOnInit(): void {

  this.ObtenerAllsucursales()
  this.sucursalUpdateform = this.FormBuilder.group({
    id:[''],
    nombre:['',Validators.required,],
    direccion:['',Validators.required]
  })
  this.subscription = this.EventEmitterServicio.invokesucursaleslistcomponent.subscribe(() => {
    this.ObtenerAllsucursales();
  });

}

ObtenerAllsucursales(){
  this.SucursalesService.getAllSucursales()
    .subscribe(SucursalesRecibidos => {
      this.sucursales = SucursalesRecibidos;

    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


key:string = 'nombre';
reverse:boolean = false;
sort(key:any){
  this.key = key;
  this.reverse = !this.reverse;

}



edit(data: Sucursal) {

  this.ColObj.id = data.id;
  this.sucursalUpdateform.controls['nombre'].setValue(data.nombre);
  this.sucursalUpdateform.controls['direccion'].setValue(data.direccion);



}


updatesucursal(){

  Swal.fire({
    title: `Desea Actualizar la sucursal?`,
    showDenyButton: true,
    confirmButtonText: 'Actualizar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('!Actualizado con exito!', '', 'success')

      this.ColObj.nombre = this.sucursalUpdateform.value.nombre;
      this.ColObj.direccion = this.sucursalUpdateform.value.direccion;



this.SucursalesServicio.updateSucursal(this.ColObj).subscribe(res =>{
  this.sucursalUpdateform.reset();
  this.ObtenerAllsucursales()
});

    } else if (result.isDenied) {
      Swal.fire('Se cancelo la accion de Actualizar', '', 'info')
    }
  })

}

deletesucursal(data:Sucursal){

  Swal.fire({
    title: `Desea borrar la sucursal ${data.nombre}?`,
    showDenyButton: true,
    confirmButtonText: 'Borrar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('!Eliminado con exito!', '', 'success')

      this.SucursalesServicio.DeleteSucursal(data)
      .subscribe(res => {
        this.ObtenerAllsucursales()
      })



    } else if (result.isDenied) {
      Swal.fire('Se cancelo la accion de Eliminar', '', 'info')
    }
  })
}








}
