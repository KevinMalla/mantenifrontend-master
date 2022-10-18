import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanExterna } from 'src/app/models/PlanExterna/planExterna';
import { ListadoPlanExterna } from 'src/app/models/PlanExterna/listadoPlanExterna';


@Injectable({
  providedIn: 'root'
})
export class PlanExternaService {

  API_URI:string = environment.baseUrl+'planexterna';

  constructor(private http:HttpClient) { }

  getAllPlanExternas():Observable<PlanExterna[]> {
    return this.http.get<PlanExterna[]>(`${this.API_URI}`);
  }

  getAllPlanExternasRelacion():Observable<ListadoPlanExterna[]> {
    return this.http.get<ListadoPlanExterna[]>(`${this.API_URI}/relacion`);
  }

  getListadoPlanExternas():Observable<ListadoPlanExterna[]> {
    return this.http.get<ListadoPlanExterna[]>(`${this.API_URI}/listado`);
  }

  addPlanExterna(planExterna:PlanExterna) {
    return this.http.post(`${this.API_URI}`, planExterna);
  }

  getPlanExterna(idPlanExterna:number) {
    return this.http.get<PlanExterna>(`${this.API_URI}/${idPlanExterna}`);
  }

  updatePlanExterna(idPlanExterna:number, planExterna:PlanExterna) {
    return this.http.put(`${this.API_URI}/${idPlanExterna}`, planExterna);
  }

  deletePlanExterna(idPlanExterna:number) {
    return this.http.delete(`${this.API_URI}/${idPlanExterna}`);    
  }

  getPlanExternasAbiertas() {
    return this.http.get(`${this.API_URI}/abiertas`);
  }

  getPlanExternaById(id: number) {
    return this.http.get<ListadoPlanExterna[]>(`${this.API_URI}/${id}`);
  }

  validarPlanExternaById(id: number) {
    return this.http.put(`${this.API_URI}/validar/${id}`, {});
  }

  getHistoricoFiltrado(periodicidad: string, empresa: string, estado: string):Observable<ListadoPlanExterna[]> {
    return this.http.get<ListadoPlanExterna[]>(`${this.API_URI}/historicofiltrado/${periodicidad}/${empresa}/${estado}`);
  }


}
