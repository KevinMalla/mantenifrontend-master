import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zona } from 'src/app/models/ubicacion-tecnica/Zona';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonasService {

  API_URI: string = environment.baseUrl+'zona';

  constructor(private http:HttpClient) { }

  getZonasDeArea(area: number): Observable<Zona[]> {
    return this.http.get<Zona[]>(`${this.API_URI}/${area}`);
  }
  createZona(zona:Zona){
    return this.http.post(`${this.API_URI}`, zona)
  }
  deleteZona(zonaid:number){
    return this.http.delete(`${this.API_URI}/${zonaid}`)
  }
  updateZona(zonaid:number, zona:Zona){
    return this.http.put(`${this.API_URI}/${zonaid}`, zona)
  }
}
