import { Injectable } from '@angular/core';
import { Equipo } from '../../../models/ubicacion-tecnica/Equipo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  API_URI:string = environment.baseUrl+'equipo';

  constructor(private http:HttpClient) { }

  getEquipos(grupo:number){
    return this.http.get<Equipo[]>(`${this.API_URI}/${grupo}`)
  }
  createEquipo(equipo:Equipo){
    return this.http.post(`${this.API_URI}`, equipo)
  }
  deleteEquipo(equipoid:number){
    return this.http.delete(`${this.API_URI}/${equipoid}`)
  }
  updateEquipo(equipoid:number, equipo:Equipo){
    return this.http.put(`${this.API_URI}/${equipoid}`, equipo)
  }
}
