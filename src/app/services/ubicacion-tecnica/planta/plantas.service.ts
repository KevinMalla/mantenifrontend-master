import { Injectable } from '@angular/core';
import { Planta } from '../../../models/ubicacion-tecnica/Planta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  API_URI:string = environment.baseUrl+'planta';


  constructor(private http:HttpClient) { }

  getPlantas():Observable<Planta[]>{
    return this.http.get<Planta[]>(`${this.API_URI}`)
  }
  createPlanta(planta:Planta){
    return this.http.post(`${this.API_URI}`, planta)
  }
  deletePlanta(PlantaId:number){
    return this.http.delete(`${this.API_URI}/${PlantaId}`)
  }
  updatePlanta(plantaid:number,planta:Planta){
    return this.http.put(`${this.API_URI}/${plantaid}`, planta)
  }
}
