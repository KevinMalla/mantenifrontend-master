import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from 'src/app/models/Material/Gasto';
import { environment } from 'src/environments/environment';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class GastoMaterialService {

  API_URI:string = environment.baseUrl+'gastomaterial';

  constructor(private http:HttpClient) { }

  getGastoMaterial(){
    return this.http.get<Gasto[]>(`${this.API_URI}/`)
  }

  updateGastoMaterial(){
    return this.http.put<Gasto[]>(`${this.API_URI}/`, {})
  }

  addGastoMaterial(matid:number, cantidad:number, operarioid:String, seccionid:number){
    return this.http.post(`${this.API_URI}/`, {matid, cantidad, operarioid, seccionid})
  }


  deleteGastoMaterial(){
    return this.http.delete(`${this.API_URI}/`)
  }





  getMaterialDeOrden(ordenid:number):Observable<Gasto[]>{    
    return this.http.get<Gasto[]>(`${this.API_URI}/${ordenid}`)
  }

  deleteMaterialOrden(gastoid:number, ordenid:number){
    return this.http.delete(`${this.API_URI}/${gastoid}/${ordenid}`)
  }

  addGastoMaterialAOrden(ordenid:number, matid:number, cantidad:number, operarioid:number){
    return this.http.post(`${this.API_URI}/${ordenid}`, {matid, cantidad, operarioid})
  }





}
