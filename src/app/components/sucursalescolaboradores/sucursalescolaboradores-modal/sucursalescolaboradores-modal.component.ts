import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { ColaboradoresService } from '../../../services/colaboradores.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { Sucursal_ColaboradorGet } from 'src/app/Models/sucursal_colaboradores.modelGet';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { Sucursal_ColaboradorService } from 'src/app/services/sucursal_colaboradores.service';
import { Sucursal } from 'src/app/Models/sucursales.model';
import { Colaborador } from 'src/app/Models/colaboradores.model';
import { ColaboradorSucursal } from 'src/app/Models/colaboradoressucursales.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Sucursal_Colaborador } from 'src/app/Models/sucursal_colaboradores.model';



@Component({
  selector: 'app-sucursalescolaboradores-modal',
  templateUrl: './sucursalescolaboradores-modal.component.html',
  styleUrls: ['./sucursalescolaboradores-modal.component.css']
})
export class SucursalescolaboradoresModalComponent {
  sucursalcolaboradorform!:FormGroup;
  data:undefined|Sucursal_ColaboradorGet[];
  data1:undefined|ColaboradorSucursal[];
  public sucursalescolaboradores: Sucursal_ColaboradorGet[] = [];
  public sucursales: Sucursal[] = [];
  public colaboradores: Colaborador[] = [];
  public colaboradoressucursales: ColaboradorSucursal[] = [];




    constructor(private FormBuilder:FormBuilder, private ColaboradoresService:ColaboradoresService, private router: Router, private route:ActivatedRoute,private EventEmitterServicio: EventEmitterService,private SucursalesServicio:SucursalesService,public sucursalescolaboradoresservicio: Sucursal_ColaboradorService){

    }

    ngOnInit(): void {

      this.ObtenerAllcolaboradorsucursal();
      this.ObtenerAllsucursales();



      this.sucursalcolaboradorform = this.FormBuilder.group({
        colaboradorId:['',Validators.required,],
        sucursalId:['',Validators.required],
        distanciaKm:['',Validators.required]

      })


    }
    ObtenerAllcolaboradorsucursal(){
      this.ColaboradoresService.GetColaboradorSucursal()
        .subscribe(SucursalescolaboradoresRecibidos => {
          this.colaboradoressucursales = SucursalescolaboradoresRecibidos;

        });


      }

      ObtenerAllsucursales(){
        this.SucursalesServicio.getAllSucursales()
          .subscribe(SucursalesRecibidos => {
            this.sucursales = SucursalesRecibidos;

          });
        }

    funcionsucursalescolaboradorescomponent():void{
      this.EventEmitterServicio.onsucursalcolaboradorcomponentClick();
    }

    addsucursalcolaborador(data:Sucursal_Colaborador){
      this.sucursalescolaboradoresservicio.PostSucursalColaborador(data).subscribe( res=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Se ha Ingresado al colaborador`,
          showConfirmButton: false,
          timer: 1500
        })
        this.sucursalcolaboradorform.reset();
        this.funcionsucursalescolaboradorescomponent();

      });
    }




}
