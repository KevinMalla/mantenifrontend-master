import { Zona } from './Zona';

export interface Seccion{
    ZonaId?:Zona["ZonaId"];
    SeccionId:number;
    Denominacion?:string;
    Descripcion?:string;
}