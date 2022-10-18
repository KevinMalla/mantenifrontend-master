import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from 'src/app/models/ubicacion-tecnica/Area';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AreasService {

  API_URI:string = environment.baseUrl+'area';

  constructor(private http:HttpClient) { }

  getAreas(planta:Number):Observable<Area[]>{
    return this.http.get<Area[]>(`${this.API_URI}/${planta}`)
  }
  createArea(area:Area){
    return this.http.post(`${this.API_URI}`, area)
  }
  deleteArea(areaid:number){
    return this.http.delete(`${this.API_URI}/${areaid}`)
  }
  updateArea(areaid:number, area:Area){
    return this.http.put(`${this.API_URI}/${areaid}`, area)
  }
}
