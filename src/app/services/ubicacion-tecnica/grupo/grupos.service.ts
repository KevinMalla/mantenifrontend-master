import { Injectable } from '@angular/core';
import { Grupo } from '../../../models/ubicacion-tecnica/Grupo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private http:HttpClient) { }

  API_URI:string = environment.baseUrl+'grupo';

  getGrupos(codigo:number){
    return this.http.get<Grupo[]>(`${this.API_URI}/${codigo}`)
  }
  createGrupo(grupo:Grupo){
    return this.http.post(`${this.API_URI}`,grupo)
  }
  deleteGrupo(grupoid:number){
    return this.http.delete(`${this.API_URI}/${grupoid}`)
  }
  updateGrupo(grupoid:number, grupo:Grupo){
    return this.http.put(`${this.API_URI}/${grupoid}`, grupo)
  }
}
