import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaExterna } from 'src/app/models/EmpresaExterna/EmpresaExterna';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmpresaExternaService {

  API_URI:string = environment.baseUrl + 'empresaexterna';

  constructor(private http:HttpClient) { }

  getEmpresasExternas():Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URI}`);
  }

  addEmpresaExterna(empresaExterna: EmpresaExterna) {
    return this.http.post(`${this.API_URI}`, empresaExterna);
  }

  deleteEmpresaExterna(id:number) {
    return this.http.delete(`${this.API_URI}/${id}`);
  }

  updateEmpresaExterna(id: number, empresaExterna: EmpresaExterna) {
    return this.http.put(`${this.API_URI}/${id}`, empresaExterna);
  }

}
