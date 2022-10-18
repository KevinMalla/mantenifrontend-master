import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Codigo } from 'src/app/models/ubicacion-tecnica/Codigo';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CodigosService {

  API_URI:string = environment.baseUrl+'codigo';


  constructor(private http:HttpClient) { }

  getCodigoDeSeccion(seccion:number):Observable<Codigo[]>{
    return this.http.get<Codigo[]>(`${this.API_URI}/${seccion}`);
  }
  createCodigo(codigo:Codigo){
    return this.http.post(`${this.API_URI}`, codigo)
  }
  deleteCodigo(codigoid:number){
    return this.http.delete(`${this.API_URI}/${codigoid}`)
  }
  updateCodigo(codigoid:number, codigo:Codigo){
    return this.http.put(`${this.API_URI}/${codigoid}`, codigo)
  }
}
