import { Sucursal } from './../../../Models/sucursales.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { data } from 'jquery';
import { SucursalesService } from 'src/app/services/sucursales.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-sucursales-modal',
  templateUrl: './sucursales-modal.component.html',
  styleUrls: ['./sucursales-modal.component.css']
})
export class SucursalesModalComponent implements OnInit{

  sucursalform!:FormGroup;
  data:undefined|Sucursal[];



    constructor(private FormBuilder:FormBuilder, private Sucursal:SucursalesService, private router: Router, private route:ActivatedRoute){

    }

    ngOnInit(): void {
      this.sucursalform = this.FormBuilder.group({
        nombre:['',Validators.required],
        direccion:['',Validators.required]

      })

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
      });

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
