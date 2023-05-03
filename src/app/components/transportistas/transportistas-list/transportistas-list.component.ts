import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transportista } from 'src/app/Models/transportistas.model';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { TransportistasService } from 'src/app/services/transportistas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transportistas-list',
  templateUrl: './transportistas-list.component.html',
  styleUrls: ['./transportistas-list.component.css']
})


export class TransportistasListComponent implements OnInit{

  public transportistas: Transportista[] = [];
  searchText: any;
  p:number = 1;
  data:undefined|Transportista[];
  TransportistaUpdateform!:FormGroup;
  ColObj : Transportista = new Transportista();



  constructor(private TransportistasService: TransportistasService, private FormBuilder:FormBuilder,private TtransportistasServicio:TransportistasService,private router: Router, private route:ActivatedRoute,private EventEmitterServicio: EventEmitterService) {



}

ObtenerAllTransportistas(){
  this.TransportistasService.getAllTransportistas()
      .subscribe(TtransportistasRecibidos => {
        this.transportistas = TtransportistasRecibidos;
      });
}


ngOnInit(): void {
  this.ObtenerAllTransportistas();

  this.TransportistaUpdateform = this.FormBuilder.group({
    id:[''],
    primernombre:['',Validators.required],
      fechanacimiento:['',Validators.required],
      telefono:['',Validators.required],
      tarifa:['',Validators.required],


  })
  if (this.EventEmitterServicio.subsvar==undefined) {
    this.EventEmitterServicio.subsvar = this.EventEmitterServicio.
    invoketransportistalistcomponent.subscribe((name:string) => {
      this.ObtenerAllTransportistas();
    });
  }
}
key:string = 'primerNombre';
reverse:boolean = false;
sort(key:any){
  this.key = key;
  this.reverse = !this.reverse;

}


edit(data: Transportista) {

  this.ColObj.id = data.id;
  this.TransportistaUpdateform.controls['primernombre'].setValue(data.primerNombre);
  this.TransportistaUpdateform.controls['fechanacimiento'].setValue(data.fechaNacimiento.toString().substring(0,10));
  this.TransportistaUpdateform.controls['telefono'].setValue(data.telefono);
  this.TransportistaUpdateform.controls['tarifa'].setValue(data.tarifa);


}


updateTransportista(){

  Swal.fire({
    title: `Desea Actualizar al Transportista?`,
    showDenyButton: true,
    confirmButtonText: 'Actualizar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('!Actualizado con exito!', '', 'success')

      this.ColObj.primerNombre = this.TransportistaUpdateform.value.primernombre;
this.ColObj.fechaNacimiento = this.TransportistaUpdateform.value.fechanacimiento;
this.ColObj.telefono = this.TransportistaUpdateform.value.telefono;
this.ColObj.tarifa = this.TransportistaUpdateform.value.tarifa;

this.TtransportistasServicio.updateTransportista(this.ColObj).subscribe(res =>{
  this.TransportistaUpdateform.reset();
  this.ObtenerAllTransportistas();
});

    } else if (result.isDenied) {
      Swal.fire('Se cancelo la accion de Actualizar', '', 'info')
    }
  })

}

deleteTransportista(data:Transportista){

  Swal.fire({
    title: `Desea borrar al Transportista ${data.primerNombre}?`,
    showDenyButton: true,
    confirmButtonText: 'Borrar',
    denyButtonText: `Cancelar`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('!Eliminado con exito!', '', 'success')

      this.TtransportistasServicio.DeleteTransportista(data)
      .subscribe(res => {

        this.ObtenerAllTransportistas();
      })



    } else if (result.isDenied) {
      Swal.fire('Se cancelo la accion de Eliminar', '', 'info')
    }
  })


}





}

