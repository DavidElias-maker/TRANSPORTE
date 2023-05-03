import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Transportista } from 'src/app/Models/transportistas.model';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { TransportistasService } from 'src/app/services/transportistas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-transportistas-modal',
  templateUrl: './transportistas-modal.component.html',
  styleUrls: ['./transportistas-modal.component.css']
})





export class TransportistasModalComponent {

  Transportistaform!:FormGroup;
  data:undefined|Transportista[];
  public Transportistaes: Transportista[] = [];

  constructor(private FormBuilder:FormBuilder, private TransportistasService: TransportistasService, private router: Router, private route:ActivatedRoute,private EventEmitterServicio: EventEmitterService){

  }

  ngOnInit(): void {
    this.Transportistaform = this.FormBuilder.group({
      primernombre:['',Validators.required],
      fechanacimiento:['',Validators.required],
      telefono:['',Validators.required],
      tarifa:['',Validators.required],

    })

  }

  funcionTransportistaescomponent(){
    this.EventEmitterServicio.ontransportistacomponentClick();
  }



  addTransportista(data:Transportista){
    this.TransportistasService.PostTransportista(data).subscribe( res=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se ha Ingresado al Transportista`,
        showConfirmButton: false,
        timer: 1500
      })
      this.Transportistaform.reset();
      this.funcionTransportistaescomponent();

    });

  }



}
