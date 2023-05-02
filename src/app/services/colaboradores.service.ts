import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Colaborador } from '../Models/colaboradores.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { data } from 'jquery';
import { colaboradoresdelete } from '../Models/colaboradoresdelete.model';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}
    getAllColaboradores(): Observable<Colaborador[]>{
     return this.http.get<Colaborador[]>(this.baseApiUrl + '/api/Colaborador');

    }

    PostColaborador(data:Colaborador): Observable<Colaborador>{
    return this.http.post<Colaborador>(this.baseApiUrl + '/api/Colaborador',data);
    }

    updateColaborador(data:Colaborador){
      return this.http.put(this.baseApiUrl + '/api/Colaborador',data,{responseType: 'text'});


  }

  DeleteColaborador(data:Colaborador){

    return this.http.request('DELETE',this.baseApiUrl + '/api/Colaborador',{ body: data , responseType: 'text'});
  }

  }




