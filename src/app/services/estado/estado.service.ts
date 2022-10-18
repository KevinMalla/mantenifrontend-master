import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  API_URI:string = environment.baseUrl+'estado';

  constructor(private http:HttpClient) { }

  getEstados():Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URI}`)
  }
}
