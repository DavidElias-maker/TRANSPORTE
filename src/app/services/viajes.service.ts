import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Colaborador } from '../Models/colaboradores.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { data } from 'jquery';
import { Sucursal_Colaborador } from '../Models/sucursal_colaboradores.model';



@Injectable({
  providedIn: 'root'
})
export class ViajeService {



  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}


   PostViaje(sucursalColaboradoresIds: {sucursalColaboradoresId: number}[], transportistaId: number){
    const requestBody = sucursalColaboradoresIds;
    return this.http.post(this.baseApiUrl + '/api/Viaje/pruebafor?transportistaId='+ transportistaId, requestBody);



    }



}
