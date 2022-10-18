import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/Operario/Usuario';
import { environment } from "../../../environments/environment"
@Injectable({
  providedIn: 'root'
})
export class EncabezadoService {

  API_URI:string = environment.baseUrl+'encabezado';

  constructor(private http:HttpClient) { }

  getPlanta():Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URI}/planta`)
  }

  selectOne(planta:number, codigoTrabajador:string):Observable<any>{
    return this.http.get<any>(`${this.API_URI}/trabajador/${planta}/${codigoTrabajador}`)
  }

  selectUser(codigo:string):Observable<any>{
    return this.http.get<any>(`${this.API_URI}/usuario/${codigo}`)
  }

  login(codigo:string, password:string):Observable<any>{
    return this.http.get<any>(`${this.API_URI}/login/${codigo}/${password}`)
  }

  changePassword(codigo:string, user:Usuario){
    return this.http.put<any>(`${this.API_URI}/usuario/${codigo}`, user)
  }
}
