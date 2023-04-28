import { Colaborador } from './../../../Models/colaboradores.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator, Validators } from '@angular/forms';
import { ColaboradoresService } from '../../../services/colaboradores.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-colaboradores-modal',
  templateUrl: './colaboradores-modal.component.html',
  styleUrls: ['./colaboradores-modal.component.css']
})
export class ColaboradoresModalComponent implements OnInit {

colaboradorform!:FormGroup;
data:undefined|Colaborador[];



  constructor(private FormBuilder:FormBuilder, private Colaborador:ColaboradoresService, private router: Router, private route:ActivatedRoute){

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

  addcolaborador(data:Colaborador){
    this.Colaborador.PostColaborador(data).subscribe( res=>{
      this.colaboradorform.reset();
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
