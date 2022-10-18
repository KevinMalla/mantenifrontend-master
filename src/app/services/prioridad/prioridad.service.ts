import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prioridad } from '../../models/Prioridad/Prioridad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrioridadService {


  API_URI:string = environment.baseUrl+'prioridad';

  constructor(private http:HttpClient) { }

  getPrioridades():Observable<Prioridad[]>{
    return this.http.get<Prioridad[]>(`${this.API_URI}/`)
  }
}
