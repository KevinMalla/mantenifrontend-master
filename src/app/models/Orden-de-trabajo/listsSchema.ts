import { OrdenDeTrabajoCorrectiva } from "./OrdenDeTrabajoCorrectiva";

export interface ListSchema {
    nombre:string,
    ordenes: OrdenDeTrabajoCorrectiva[];
}