import { Seccion } from './Seccion';
export interface Codigo{
    SeccionId:Seccion["SeccionId"];
    CodigoId:number;
    Denominacion:string;
    Descripcion:string;
}