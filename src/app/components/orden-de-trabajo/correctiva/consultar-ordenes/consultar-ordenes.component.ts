import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenDeTrabajo } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajo';
import { OrdenDeTrabajoService } from 'src/app/services/orden-de-trabajo/orden-de-trabajo.service';

@Component({
  selector: 'app-consultar-ordenes',
  templateUrl: './consultar-ordenes.component.html',
  styleUrls: ['./consultar-ordenes.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class ConsultarOrdenesComponent implements OnInit {
  tipoUsuario: number = Number(localStorage.getItem('tipoUsuario'))

  dataSource = new MatTableDataSource<OrdenDeTrabajo>();
  ordenes!: OrdenDeTrabajo[];
  searchKey!: string;

  displayedColumns:string[] = ['OrdenId', 'TituloCorrectivo', 'UbicacionTecnica', 'Linea', 'Estado', 'FechaCreacion','FechaValidado'];

  columnsToDisplay:string[] = ['OrdenId', 'TituloCorrectivo', 'UbicacionTecnica', 'Linea', 'Estado', 'FechaCreacion','FechaValidado',];

  
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private ordenService:OrdenDeTrabajoService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
      if(this.tipoUsuario!=6) this.displayedColumns.push('acciones')
      this.getOrdenes(2);
  }

  //Obtiene las ordenes de tipo pasdo por parámetro; tipo 2 es de tipo correctivo
  getOrdenes(id:number){
    this.ordenService.getOrdenes(id).subscribe(
      res => {
        this.dataSource.data = res
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  //Tras confirmar elimina la orden con id pasda por parámetro
  eliminar(ordenid:number, e:any){
    e.stopPropagation();
    if(confirm('¿Desea eliminar la orden?')){
      this.ordenService.deleteOrden(ordenid).subscribe(
      res => {
        this.getOrdenes(2)
      }, err => 
      this.snackBar.open('No se puede borrar la orden', 'Cerrar', {duration:2000, horizontalPosition:'center', verticalPosition:'top'})
      )
    }
    this.ordenService.deleteOrden(ordenid).subscribe
  }
    /*Filtros para mat-table */
    applyFilter(){
      this.dataSource.filter = this.searchKey.toLowerCase().trim();
    }
    onSearchClear(){
      this.searchKey = "";
      this.applyFilter();
    }
    /*------------------------*/

}
