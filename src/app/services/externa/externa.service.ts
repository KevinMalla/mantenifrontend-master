import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Externa } from 'src/app/models/Externa/Externa';


@Injectable({
  providedIn: 'root'
})
export class ExternaService {

  API_URI:string = environment.baseUrl+'externas';

  constructor(private http:HttpClient) { }

  getExternas():Observable<Externa[]> {
    return this.http.get<Externa[]>(`${this.API_URI}`);
  }

  getLastExterna():Observable<any> {
    return this.http.get<any>(`${this.API_URI}/last`);
  }

  addExterna(externa:Externa) {
    return this.http.post(`${this.API_URI}`, externa);
  }

  updateExterna(externa:Externa) {
    return this.http.put(`${this.API_URI}/${externa.id}`, externa);
  }

  getPeriodicidad():Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URI}/periodicidad`)
  }

}
