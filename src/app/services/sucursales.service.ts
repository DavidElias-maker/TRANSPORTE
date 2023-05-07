import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { data } from 'jquery';
import { Sucursal } from '../Models/sucursales.model';



@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}
    getAllSucursales(): Observable<Sucursal[]>{
     return this.http.get<Sucursal[]>(this.baseApiUrl + '/api/Sucursal');

    }

    PostSucursal(data:Sucursal): Observable<Sucursal>{
    return this.http.post<Sucursal>(this.baseApiUrl + '/api/Sucursal',data);
    }

    updateSucursal(data:Sucursal){
      return this.http.put(this.baseApiUrl + '/api/Sucursal',data,{responseType: 'text'});


  }

  DeleteSucursal(data:Sucursal){

    return this.http.request('DELETE',this.baseApiUrl + '/api/Sucursal',{ body: data , responseType: 'text'});
  }

  getAllSucursalesbyId(): Observable<Sucursal[]>{
    return this.http.get<Sucursal[]>(this.baseApiUrl + '/api/Sucursal/SucursalColaboradorById');

  }
}
