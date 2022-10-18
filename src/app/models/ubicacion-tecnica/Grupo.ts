import { Codigo } from './Codigo';

export interface Grupo{
    CodigoId:Codigo["CodigoId"];
    GrupoId:number;
    Denominacion:string;
    Descripcion:string;
}