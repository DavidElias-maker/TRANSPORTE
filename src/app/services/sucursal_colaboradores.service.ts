import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Colaborador } from '../Models/colaboradores.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { data } from 'jquery';
import { Sucursal_ColaboradorGet } from '../Models/sucursal_colaboradores.modelGet';
import { Sucursal_Colaborador } from '../Models/sucursal_colaboradores.model';



@Injectable({
  providedIn: 'root'
})
export class Sucursal_ColaboradorService {



  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}
  getAllSucursalColaborador(): Observable<Sucursal_ColaboradorGet[]>{
    return this.http.get<Sucursal_ColaboradorGet[]>(this.baseApiUrl + '/api/SucursalColaborador');

   }

   PostSucursalColaborador(data:Sucursal_Colaborador){
    return this.http.post(this.baseApiUrl + '/api/SucursalColaborador',data);
    }

    updateSucursalcolaboradores(data:Sucursal_ColaboradorGet){
      return this.http.put(this.baseApiUrl + '/api/SucursalColaborador',data,{responseType: 'text'});


  }

  DeleteSucursalcolaborador(data:Sucursal_ColaboradorGet){

    return this.http.request('DELETE',this.baseApiUrl + '/api/SucursalColaborador',{ body: data , responseType: 'text'});
  }




}
