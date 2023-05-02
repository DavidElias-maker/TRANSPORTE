import { Colaborador } from './../../../Models/colaboradores.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColaboradoresService } from '../../../services/colaboradores.service';
import { Pipe, PipeTransform } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { data } from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';











@Component({

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
  ColObj : Colaborador = new Colaborador();




  constructor(private ColaboradoresService: ColaboradoresService, private FormBuilder:FormBuilder,private ColaboradoresServicio:ColaboradoresService,private router: Router, private route:ActivatedRoute) {

    this.ColaboradoresService.getAllColaboradores()
      .subscribe(colaboradoresRecibidos => {
        this.colaboradores = colaboradoresRecibidos;

      });


}


ngOnInit(): void {

  this.colaboradorUpdateform = this.FormBuilder.group({
    id:[''],
    primernombre:['',Validators.required,],
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

  this.ColObj.id = data.id;
  this.colaboradorUpdateform.controls['primernombre'].setValue(data.primerNombre);
  this.colaboradorUpdateform.controls['primerapellido'].setValue(data.primerApellido);
  this.colaboradorUpdateform.controls['dni'].setValue(data.dni);
  this.colaboradorUpdateform.controls['fechanacimiento'].setValue(data.fechaNacimiento.toString().substring(0,10));
  this.colaboradorUpdateform.controls['direccion'].setValue(data.direccion);
  this.colaboradorUpdateform.controls['telefono'].setValue(data.telefono);


}


updateColaborador(){

  Swal.fire({
    title: `Desea Actualizar al Colaborador?`,
    showDenyButton: true,
    confirmButtonText: 'Actualizar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('!Actualizado con exito!', '', 'success')

      this.ColObj.primerNombre = this.colaboradorUpdateform.value.primernombre;
this.ColObj.primerApellido = this.colaboradorUpdateform.value.primerapellido;
this.ColObj.dni = this.colaboradorUpdateform.value.dni;
this.ColObj.fechaNacimiento = this.colaboradorUpdateform.value.fechanacimiento;
this.ColObj.direccion = this.colaboradorUpdateform.value.direccion;
this.ColObj.telefono = this.colaboradorUpdateform.value.telefono;

this.ColaboradoresServicio.updateColaborador(this.ColObj).subscribe(res =>{
  this.colaboradorUpdateform.reset();
});

    } else if (result.isDenied) {
      Swal.fire('Se cancelo la accion de Actualizar', '', 'info')
    }
  })

}

deleteColaborador(data:Colaborador){

  Swal.fire({
    title: `Desea borrar al Colaborador ${data.primerNombre + " " +data.primerApellido}?`,
    showDenyButton: true,
    confirmButtonText: 'Borrar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('!Eliminado con exito!', '', 'success')

      this.ColaboradoresServicio.DeleteColaborador(data)
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










