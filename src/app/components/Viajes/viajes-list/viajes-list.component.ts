
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal_Colaborador } from 'src/app/Models/sucursal_colaboradores.model';
import { Sucursal_ColaboradorService } from 'src/app/services/sucursal_colaboradores.service';
import { data } from 'jquery';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';




@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.css']
})


export class ViajesListComponent implements OnInit {
  public employeeForm!: FormGroup;

  public sucursales_colaboradores: Sucursal_Colaborador[] = [];

  selectedValues: string[] = [];
  data:undefined|Sucursal_Colaborador[];
  ColObj : Sucursal_Colaborador = new Sucursal_Colaborador();



  isCheckAll: boolean = false;

  constructor(private fb: FormBuilder, private Sucursal_ColaboradorServicio: Sucursal_ColaboradorService, private FormBuilder: FormBuilder) {


  }
  ngOnInit(): void {


this.getNombreCompleto();

this.employeeForm = this.FormBuilder.group({
  tableRows: this.fb.array([],[Validators.required]),
  nombreCompleto: ['',[Validators.required,Validators.minLength(10)]],
  nombre:['',[Validators.required]],
  distanciaKm: ['',[Validators.required]]
});


this.addRow();
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




  removeEmployee(index:number) {
    const control =  this.employeeForm.get('tableRows') as FormArray;
    control.removeAt(index);
  }

  onSaveForm() {
    const formValue = this.employeeForm.value;
console.log(formValue);
  }

getNombreCompleto(){



  this.Sucursal_ColaboradorServicio. getAllSucursalColaborador().subscribe(res => {


    this.sucursales_colaboradores = res;

  })
}







onOptionSelected(event: MatAutocompleteSelectedEvent) {

  const value = event.option.value;
  if (!this.selectedValues.includes(value)) {
    this.selectedValues.push(value);
  }

    const tableRows = this.employeeForm.get('tableRows') as FormArray;
    const newRow = this.FormBuilder.group({
      nombreCompleto: [''],
      nombre: [''],
      distanciaKm: ['']
    });


    const selectedNombreCompleto = event.option.value;
    const selectedSucursalColaborador = this.sucursales_colaboradores.find(item => item.nombreCompleto === selectedNombreCompleto);


    const addedIndex = tableRows.length - 1;
    const addedRow = tableRows.at(addedIndex) as FormGroup;
    addedRow.controls['nombre'].setValue(selectedSucursalColaborador?.nombre);
    addedRow.controls['distanciaKm'].setValue(selectedSucursalColaborador?.distanciaKm);

  };





}














