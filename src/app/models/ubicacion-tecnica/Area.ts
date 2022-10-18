import { Planta } from './Planta';

export interface Area{
    PlantaId:Planta["PlantaId"];
    AreaId:number;
    Denominacion:string;
    Descripcion:string;
}