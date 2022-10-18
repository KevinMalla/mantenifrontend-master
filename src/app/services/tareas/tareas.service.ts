import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from 'src/app/models/Tarea/Tarea';
import { TareaDeOt } from 'src/app/models/Tarea/TareaDeOT';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  API_URI:string = environment.baseUrl+'tarea';

  constructor(private http:HttpClient) { }

  getTareas():Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.API_URI}`)
  }

  getTareasDePreventivo(preventivo:number):Observable<Tarea[]>{
    return this.http.get<Tarea[]>(`${this.API_URI}/preventivo/${preventivo}`)
  }

  getTarea(tarea:number):Observable<any>{
    return this.http.get(`${this.API_URI}/tarea/${tarea}`)
  }

  getLastTarea():Observable<any>{
    return this.http.get(`${this.API_URI}/tarea/last`)
  }

  insertTarea(tareaDescrip:string[]){
    return this.http.post(`${this.API_URI}/tarea`, tareaDescrip);
  }

  insertTareaPrev(preventivo:number, tarea:number[]){
    return this.http.post(`${this.API_URI}/tarea/preventivo`,{preventivo,tarea})
  }

  deleteTarea(tareaid:number){
    return this.http.delete(`${this.API_URI}/tarea/${tareaid}`)
  }

  deleteTareaPrev(PrevId:number, TareaId:number){
    return this.http.delete(`${this.API_URI}/tarea/${PrevId}/${TareaId}`)
  }

  updateTarea(tareaid:number, updatedTarea:Tarea):Observable<Tarea>{
    return this.http.put(`${this.API_URI}/tarea/${tareaid}`, updatedTarea)
  }

  getTareasDeOrden(ordenid:number):Observable<TareaDeOt[]>{
    return this.http.get<TareaDeOt[]>(`${this.API_URI}/ordendetrabajo/${ordenid}`)
  }

  updateTareaDeOrden(tareaid:number){
    return this.http.put(`${this.API_URI}/ordendetrabajo/${tareaid}`, {})
  }

  deleteTareaDeOrden(tareaid:number){
    return this.http.delete(`${this.API_URI}/ordendetrabajo/${tareaid}`)
  }
  
}
