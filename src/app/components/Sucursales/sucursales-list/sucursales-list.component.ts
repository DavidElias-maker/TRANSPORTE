import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/Models/sucursales.model';
import { Pipe, PipeTransform } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { data } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SucursalesService } from 'src/app/services/sucursales.service';

@Component({
  selector: 'app-sucursales-list',
  templateUrl: './sucursales-list.component.html',
  styleUrls: ['./sucursales-list.component.css']
})
export class SucursalesListComponent implements OnInit {
  public sucursales: Sucursal[] = [];
  searchText: any;
  p:number = 1;
  data:undefined|Sucursal[];
  sucursalUpdateform!:FormGroup;
  ColObj : Sucursal = new Sucursal();

  constructor(private SucursalesService: SucursalesService, private FormBuilder:FormBuilder,private SucursalesServicio:SucursalesService,private router: Router, private route:ActivatedRoute) {

    this.SucursalesService.getAllSucursales()
      .subscribe(SucursalesRecibidos => {
        this.sucursales = SucursalesRecibidos;

      });


}

ngOnInit(): void {

  this.sucursalUpdateform = this.FormBuilder.group({
    id:[''],
    nombre:['',Validators.required,],
    direccion:['',Validators.required]
  })


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
      })

      this.resetPage()

    } else if (result.isDenied) {
      Swal.fire('Se cancelo la accion de Eliminar', '', 'info')
    }
  })
}

resetPage() {
  const prevConfiguration = this.router.routeReuseStrategy.shouldReuseRoute;
   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   this.router.onSameUrlNavigation = "reload";
   this.router.navigate(["./"], { relativeTo: this.route }).then(() => {
       this.router.routeReuseStrategy.shouldReuseRoute = prevConfiguration;
       this.router.onSameUrlNavigation = "ignore";
   });
 }






}
