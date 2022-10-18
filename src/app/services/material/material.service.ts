import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gasto } from 'src/app/models/Material/Gasto';
import { Material } from 'src/app/models/Material/Material';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  API_URI:string = environment.baseUrl+'material';

  constructor(private http:HttpClient) { }

  getMaterial():Observable<Material[]>{
    return this.http.get<Material[]>(`${this.API_URI}/`)
  }

  updateMaterial(material:Material){
    return this.http.put(`${this.API_URI}/${material.MatId}`, material)
  }

  addMaterial(material:Material){
    return this.http.post(`${this.API_URI}`, material)
  }

  deleteMaterial(MatId:number){
    return this.http.delete(`${this.API_URI}/${MatId}`)
  }
///
  getMaterialDeOrden(ordenid:number){    
    return this.http.get<Gasto[]>(`${this.API_URI}/ordendetrabajo/${ordenid}`)
  }

  deleteMaterialDeOrden(gastoid:number){
    return this.http.delete(`${this.API_URI}/ordendetrabajo/${gastoid}`)
  }

  addMaterialAOrden(ordenid:number, matid:number, cantidad:number, operarioid:number){
    return this.http.post(`${this.API_URI}/ordendetrabajo/${ordenid}`, {matid, cantidad, operarioid})
  }

  getGastoMaterial(){
    return this.http.get<Gasto[]>(`${this.API_URI}/gastomaterial`)
  }
//
  updateGastoMaterial(){
    return this.http.put<Gasto[]>(`${this.API_URI}/gastomaterial`, {})
  }
}
