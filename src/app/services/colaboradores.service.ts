import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Colaborador } from '../Models/colaboradores.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}
    getAllColaboradores(): Observable<Colaborador[]>{
     return this.http.get<Colaborador[]>(this.baseApiUrl + '/api/Colaborador');

    }

    PostColaborador(data:Colaborador){
    return this.http.post<Colaborador>(this.baseApiUrl + '/api/Colaborador',data);
    }

UpdateColaborador(data:Colaborador,id:number){
  return this.http.post<Colaborador>(this.baseApiUrl + '/api/Colaborador' + id,data).
   pipe(map((res:Colaborador)=>{
    return res;
  }))
}

   }

