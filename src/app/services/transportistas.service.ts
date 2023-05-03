import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { data } from 'jquery';
import { Transportista } from '../Models/transportistas.model';




@Injectable({
  providedIn: 'root'
})
export class TransportistasService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}
    getAllTransportistas(): Observable<Transportista[]>{
     return this.http.get<Transportista[]>(this.baseApiUrl + '/api/Transportista');

    }

    PostTransportista(data:Transportista): Observable<Transportista>{
    return this.http.post<Transportista>(this.baseApiUrl + '/api/Transportista',data);
    }

    updateTransportista(data:Transportista){
      return this.http.put(this.baseApiUrl + '/api/Transportista',data,{responseType: 'text'});


  }

  DeleteTransportista(data:Transportista){

    return this.http.request('DELETE',this.baseApiUrl + '/api/Transportista',{ body: data , responseType: 'text'});
  }

  }
