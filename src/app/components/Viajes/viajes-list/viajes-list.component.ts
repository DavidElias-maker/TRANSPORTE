
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal_Colaborador } from 'src/app/Models/sucursal_colaboradores.model';
import { Sucursal_ColaboradorService } from 'src/app/services/sucursal_colaboradores.service';
import { data } from 'jquery';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { TransportistasService } from 'src/app/services/transportistas.service';
import { Transportista } from '../../../Models/transportistas.model';




@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.css']
})


export class ViajesListComponent implements OnInit {
  public employeeForm!: FormGroup;

  public sucursales_colaboradores: Sucursal_Colaborador[] = [];

  public transportistas: Transportista[] = [];
  columnSums: number[] = [];
  selectedValues1: string[] = [];
  selectedValues2: string[] = [];
  data:undefined|Sucursal_Colaborador[];
  data2:undefined|Transportista[];
  ColObj : Sucursal_Colaborador = new Sucursal_Colaborador();



  isCheckAll: boolean = false;

  constructor(private fb: FormBuilder, private Sucursal_ColaboradorServicio: Sucursal_ColaboradorService, private FormBuilder: FormBuilder,private TransportistasServicio:TransportistasService) {


  }
  ngOnInit(): void {


this.getNombreCompleto();
this.ObtenerAllTransportistas();

this.employeeForm = this.FormBuilder.group({
  tableRows: this.fb.array([],[Validators.required]),
  nombreCompleto: ['',[Validators.required,Validators.minLength(10)]],
  nombre:['',[Validators.required]],
  distanciaKm: ['',[Validators.required]],
  primerNombre: ['',[Validators.required]],
  tarifa: ['',[Validators.required]],
  multipliedSums: [null]
});


this.addRow();
this.getNombreCompleto();
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      nombreCompleto: ['',[Validators.required,Validators.minLength(3)]],
      nombre:[''],
      distanciaKm: [''],
      primerNombre:[''],
      tarifa: ['',[Validators.required]],
      multipliedSums: [null]
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
   this.calculateColumnSums()
  }

getNombreCompleto(){



  this.Sucursal_ColaboradorServicio. getAllSucursalColaborador().subscribe(res => {


    this.sucursales_colaboradores = res;

  })
}
ObtenerAllTransportistas(){
  this.TransportistasServicio.getAllTransportistas()
      .subscribe(TtransportistasRecibidos => {
        this.transportistas = TtransportistasRecibidos;
      });
}







onOptionSelected1(event: MatAutocompleteSelectedEvent) {

  const value = event.option.value;
  if (!this.selectedValues1.includes(value)) {
    this.selectedValues1.push(value);
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

  onOptionSelected2(event: MatAutocompleteSelectedEvent) {


    const selectedPrimerNombre = event.option.value;
    const selectedTransportista = this.transportistas.find(item => item.primerNombre === selectedPrimerNombre);
    this.employeeForm.controls['tarifa'].setValue(selectedTransportista?.tarifa);


  }

  calculateColumnSums() {
    const numColumns = 3;
    this.columnSums = Array(numColumns).fill(0);

    const tableRows = this.employeeForm.get('tableRows') as FormArray;
    tableRows.controls.forEach((rowGroup: AbstractControl) => {
      const row = rowGroup.value;
      for (let i = 0; i < numColumns; i++) {
        const columnName = Object.keys(row)[i];
        const cellValue = row[columnName];


        if (!isNaN(cellValue)) {
          this.columnSums[i] += +cellValue;
        }
      }
    });

    const selectedTransportista = this.employeeForm.get('primerNombre')?.value;
  const transportista = this.transportistas.find(item => item.primerNombre === selectedTransportista);


  let result = 0;
  if (transportista) {
    result = this.columnSums.reduce((acc, sum) => acc + sum) * transportista.tarifa;
  }

  this.employeeForm.get('multipliedSums')?.setValue(result);

  }
}
















