import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Preventivo } from 'src/app/models/Preventivo/Preventivo';
import { Ubicacion } from 'src/app/models/ubicacion-tecnica/Ubicacion';
import { UTPreventivo } from 'src/app/models/Preventivo/UtPreventivo';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UTPreventivoService {

  API_URI:string = environment.baseUrl+'utpreventivo';

  constructor(private http:HttpClient) { }

  getPreventivo(ubicacionTecnica:Ubicacion):Observable<UTPreventivo[]>{
    return this.http.post<UTPreventivo[]>(`${this.API_URI}/preventivos`, ubicacionTecnica)
  }

  addUTPreventivo(preventivo:number, ubicacionTecnica:Ubicacion, fecha:String){
    return this.http.post(`${this.API_URI}`, {preventivo, ubicacionTecnica, fecha})
  }

  comprobarSiHayFechaFin(utprevid:number):Observable<any>{
    return this.http.get<any>(`${this.API_URI}/comprobarfin/${utprevid}`)
  }

  updatePreventivo(utprevid:number, preventivo:UTPreventivo){
    return this.http.put(`${this.API_URI}/${utprevid}`, preventivo)
  }
}