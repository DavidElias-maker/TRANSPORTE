
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal_Colaborador } from 'src/app/Models/sucursal_colaboradores.model';
import { Sucursal_ColaboradorService } from 'src/app/services/sucursal_colaboradores.service';
import { data } from 'jquery';




@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.css']
})


export class ViajesListComponent implements OnInit {
  public employeeForm: FormGroup;
  public sucursales_colaboradores: Sucursal_Colaborador[] = [];

  data:undefined|Sucursal_Colaborador[];
  ColObj : Sucursal_Colaborador = new Sucursal_Colaborador();



  isCheckAll: boolean = false;

  constructor(private fb: FormBuilder, private Sucursal_ColaboradorServicio: Sucursal_ColaboradorService ) {

    this.employeeForm = this.fb.group({
      tableRows: this.fb.array([],[Validators.required])
    });
    this.addRow();
  }
  ngOnInit() {


this.getNombreCompleto();





  }


  createFormGroup(): FormGroup {
    return this.fb.group({
      nombreCompleto: ['',[Validators.required,Validators.minLength(3)]],
      nombre:[''],
      distanciaKm: [''],
      ischecked: [false]
    });
  }

  get getFormControls() {
    const control = this.employeeForm.get('tableRows') as FormArray;
    return control;
  }

  addRow() {
    const control =  this.employeeForm.get('tableRows') as FormArray;
    control.push(this.createFormGroup());
  }

  checkAll(checkVal: boolean) {

    this.getFormControls.controls.forEach(formGroup => {
      formGroup.get('ischecked')?.setValue(checkVal);
    });
  }


  removeEmployee(index:number) {
    const control =  this.employeeForm.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  onSaveForm() {
    const formValue = this.employeeForm.value;
console.log(this.employeeForm);
  }

getNombreCompleto(){



  this.Sucursal_ColaboradorServicio. getAllSucursalColaborador().subscribe(res => {


    this.sucursales_colaboradores = res;

  })
}



}

