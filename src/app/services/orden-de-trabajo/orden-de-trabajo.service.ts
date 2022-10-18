import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListSchema } from 'src/app/models/Orden-de-trabajo/listsSchema';
import { OrdenDeTrabajo } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajo';
import { OrdenDeTrabajoCorrectiva } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajoCorrectiva';
import { OrdenDeTrabajoPreventiva } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajoPreventiva';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenDeTrabajoService {

  API_URI:string = environment.baseUrl+'ordendetrabajo';

  constructor(private http:HttpClient) { }

  //Ordenes preventivas de los 4 tipos de estado
  getPreventivoPlanificada() {
    return this.http.get<any[]>(`${this.API_URI}/preventivo/planificada`)
  }
  getPreventivoPendiente() {
    return this.http.get<any[]>(`${this.API_URI}/preventivo/pendiente`)
  }
  getPreventivoTerminada(){
    return this.http.get<any[]>(`${this.API_URI}/preventivo/terminada`)
  }
  getPreventivoValidada(){
    return this.http.get<any[]>(`${this.API_URI}/preventivo/validada`)
  }

  //Update para los saltos en el kanban de las ordenes preventivas y correctivas
  updatePlanificada(planificada:OrdenDeTrabajoPreventiva, ordenId:string){
    return this.http.put(`${this.API_URI}/preventivo/planificada/${ordenId}`,planificada)
  }
  updatePendiente(planificada:OrdenDeTrabajoPreventiva, ordenId:string){
    return this.http.put(`${this.API_URI}/preventivo/pendiente/${ordenId}`,planificada)
  }
  updateTerminada(ordenId:string){
    return this.http.put(`${this.API_URI}/preventivo/terminada/${ordenId}`,{})
  }

  updateCorrectivoOperarioId(ordenDeTrabajoCorrectiva: OrdenDeTrabajoCorrectiva, ordenId:number){
    return this.http.put(`${this.API_URI}/correctivo/ordentrabajo/${ordenId}`, ordenDeTrabajoCorrectiva);
  }

  //Update para la orden cuando se abre el modal o se quiere editar desde el kanban
  updateOrden(planificada:OrdenDeTrabajoPreventiva,ordenid:number){
    return this.http.put(`${this.API_URI}/preventivo/ordendetrabajo/${ordenid}`, planificada)
  }

  //Crear orden correctiva
  crearCorrectivo(ordenCorrectiva:OrdenDeTrabajoCorrectiva){
    return this.http.post(`${this.API_URI}/correctivo`, ordenCorrectiva)
  }

  // Actualizar operario de una orden
  actualizarOperarioOrden(ordenId:number, operarioId: number, pato:any) {
    return this.http.put(`${this.API_URI}/correctivo/${ordenId}/${operarioId}`, pato)
  }

  //Obtiene las ordenes correctivas
  getCorrectivos():Observable<ListSchema[]>{
    return this.http.get<ListSchema[]>(`${this.API_URI}/correctivo`)
  }
  
  //Get para todas las ordenes segun el tipo
  getOrdenes(tipoid:number):Observable<OrdenDeTrabajo[]>{
    return this.http.get<OrdenDeTrabajo[]>(`${this.API_URI}/tipo/${tipoid}`)
  }

  //Get datos de una orden
  getOrden(ordenid:number):Observable<OrdenDeTrabajo>{
    return this.http.get<OrdenDeTrabajo>(`${this.API_URI}/${ordenid}`)
  }

  //Borra la orden pasada por parámetro
  deleteOrden(ordenid:number){
    return this.http.delete(`${this.API_URI}/${ordenid}`)
  }

  //Update orden de trabajo de histórico
  updateOrdenDeTrabajo(ordenid:number,orden:OrdenDeTrabajo){
    return this.http.put(`${this.API_URI}/${ordenid}`, orden)
  }
}
