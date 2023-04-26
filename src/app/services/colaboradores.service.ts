import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Colaborador } from '../Models/colaboradores.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}
    getAllColaboradores(): Observable<Colaborador[]>{
     return this.http.get<Colaborador[]>(this.baseApiUrl + '/api/Colaborador');

    }

   }

