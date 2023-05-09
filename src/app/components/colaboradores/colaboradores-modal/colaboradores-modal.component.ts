import { Colaborador } from './../../../Models/colaboradores.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { ColaboradoresService } from '../../../services/colaboradores.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { data } from 'jquery';
import Swal from 'sweetalert2';
import { EventEmitterService } from 'src/app/services/event-emitter.service';


@Component({

  selector: 'app-colaboradores-modal',
  templateUrl: './colaboradores-modal.component.html',
  styleUrls: ['./colaboradores-modal.component.css'],


})
export class ColaboradoresModalComponent implements OnInit {

colaboradorform!:FormGroup;
data:undefined|Colaborador[];
public colaboradores: Colaborador[] = [];



  constructor(private FormBuilder:FormBuilder, private ColaboradoresService:ColaboradoresService, private router: Router, private route:ActivatedRoute,private EventEmitterServicio: EventEmitterService){

  }

  ngOnInit(): void {
    this.colaboradorform = this.FormBuilder.group({
      primernombre:['',Validators.required],
      primerapellido:['',Validators.required],
      dni:['',Validators.required],
      fechanacimiento:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',Validators.required]

    })

  }

  funcioncolaboradorescomponent():void{
    this.EventEmitterServicio.oncolaboradorescomponentClick();
  }



  addcolaborador(data:Colaborador){
    this.ColaboradoresService.PostColaborador(data).subscribe( res=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Se ha Ingresado al colaborador`,
        showConfirmButton: false,
        timer: 1500
      })
      this.colaboradorform.reset();
      this.funcioncolaboradorescomponent();

    });

  }




  }

