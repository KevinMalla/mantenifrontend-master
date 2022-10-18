import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trabajador } from 'src/app/models/Operario/Trabajador';
import { Usuario } from 'src/app/models/Operario/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OperarioService {

  API_URI:string = environment.baseUrl+'operario';

  constructor(private http:HttpClient) { }

  getTrabajador():Observable<Trabajador[]>{
    return this.http.get<any[]>(`${this.API_URI}/trabajador`)
  }

  getDatosTrabajador(operario:number){
    return this.http.get(`${this.API_URI}/trabajador/${operario}`)
  }
  getUsuario():Observable<Usuario[]>{
    return this.http.get<any[]>(`${this.API_URI}/usuario`)
  }
  trabajadorToUser(CodigoTrabajador:string, user:any):Observable<any[]>{
    return this.http.post<any[]>(`${this.API_URI}/usuario/${CodigoTrabajador}`,user)
  }
  deleteUser(CodigoTrabajador:string):Observable<any[]>{
    return this.http.delete<any[]>(`${this.API_URI}/usuario/${CodigoTrabajador}`)
  }
}
