import { Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ubicacion } from 'src/app/models/ubicacion-tecnica/Ubicacion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  API_URI: string = environment.baseUrl+'ubicaciontecnica';

  constructor(private http:HttpClient) { }

  getUbicaciones(ubicacionTecnica:Ubicacion){
    return this.http.post<Ubicacion[]>(`${this.API_URI}`, ubicacionTecnica);
  }
}
