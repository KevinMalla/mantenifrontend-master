import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seccion } from 'src/app/models/ubicacion-tecnica/Seccion';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SeccionesService {

  API_URI:string = environment.baseUrl+'seccion';


  constructor(private http:HttpClient) { }

  getSecciones():Observable<Seccion[]>{
    return this.http.get<Seccion[]>(`${this.API_URI}/`);
  }

  getSeccionesDeZona(zona:number):Observable<Seccion[]>{
    return this.http.get<Seccion[]>(`${this.API_URI}/${zona}`);
  }
  createSeccion(seccion:Seccion){
    return this.http.post(`${this.API_URI}`, seccion)
  }

  deleteSeccion(seccionid:number){
    return this.http.delete(`${this.API_URI}/${seccionid}`)
  }
  updateSeccion(seccionid:number, seccion:Seccion)
  {
    return this.http.put(`${this.API_URI}/${seccionid}`, seccion)
  }
}
