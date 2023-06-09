import { Sucursal } from './../../../Models/sucursales.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { SucursalesService } from 'src/app/services/sucursales.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-sucursales-modal',
  templateUrl: './sucursales-modal.component.html',
  styleUrls: ['./sucursales-modal.component.css']
})
export class SucursalesModalComponent implements OnInit {

  sucursalform!:FormGroup;
  data:undefined|Sucursal[];
  subscription: Subscription = new Subscription();



    constructor(private FormBuilder:FormBuilder, private Sucursal:SucursalesService, private router: Router, private route:ActivatedRoute,private EventEmitterServicio: EventEmitterService){

    }

    ngOnInit(): void {
      this.sucursalform = this.FormBuilder.group({
        nombre:['',Validators.required],
        direccion:['',Validators.required]

      })

    }
    funcionsucursalescomponent():void{
      this.EventEmitterServicio.onsucursalescomponentClick();
    }



    addSucursal(data:Sucursal){
      this.Sucursal.PostSucursal(data).subscribe( res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se ha Ingresado la Sucursal`,
          showConfirmButton: false,
          timer: 1500
        })
        this.sucursalform.reset();
        this.funcionsucursalescomponent();
      });

    }



}
