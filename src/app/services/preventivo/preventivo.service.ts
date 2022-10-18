import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preventivo } from 'src/app/models/Preventivo/Preventivo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreventivoService {

  API_URI:string = environment.baseUrl+'preventivo';

  constructor(private http:HttpClient) { }

  getPreventivos():Observable<Preventivo[]>{
    return this.http.get<Preventivo[]>(`${this.API_URI}`)
  }
  getLastPreventivo():Observable<any>{
    return this.http.get<any>(`${this.API_URI}/last`)
  }
  addPreventivo(preventivo:Preventivo){
    return this.http.post(`${this.API_URI}`, preventivo)
  }

  updatePreventivo(preventivo:Preventivo){
    return this.http.put(`${this.API_URI}/${preventivo.PreventivoId}`, preventivo)
  }
  
  /**Periodicidad */
  getPeriodicidad():Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URI}/periodicidad/all`)
  }
}
