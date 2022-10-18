import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment"
import { Periodicidad } from 'src/app/models/Periodicidad/Periodicidad';


@Injectable({
  providedIn: 'root'
})
export class PeriodicidadService {

  API_URI:string = environment.baseUrl+'periodicidad';

  constructor(private http:HttpClient ) { }

  getPeriodicidad():Observable<Periodicidad[]>{
    return this.http.get<Periodicidad[]>(`${this.API_URI}`)
  }

  getPeriodicidadPorId(id:number):Observable<Periodicidad[]>{
    return this.http.get<Periodicidad[]>(`${this.API_URI}/${id}`);
  }

  addPeriodicidad(periodicidad:Periodicidad){
    return this.http.post(`${this.API_URI}`, periodicidad)
  }

  updatePeriodicidad(Periodicidad: Periodicidad){
    return this.http.put(`${this.API_URI}/${Periodicidad.PeriodicidadId}`, Periodicidad)
  }

  deletePeriodicidad(PeriodicidadId:number){
    return this.http.delete(`${this.API_URI}/${PeriodicidadId}`)
  }
}
