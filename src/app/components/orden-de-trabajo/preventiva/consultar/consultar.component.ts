import {animate, state, style, transition, trigger} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrdenDeTrabajo } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajo';
import { OrdenDeTrabajoPreventiva } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajoPreventiva';
import { OrdenDeTrabajoService } from 'src/app/services/orden-de-trabajo/orden-de-trabajo.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConsultarComponent implements OnInit {

  dataSource = new MatTableDataSource<OrdenDeTrabajo>();
  searchKey!: string;

  displayedColumns: string[] = ['OrdenId', 'UbicacionTecnica', 'Preventivo', 'Linea', 'Estado', 'FechaCreacion', 'FechaValidado', 'acciones'];
  columnsToDisplay: string[] = ['OrdenId', 'UbicacionTecnica', 'Preventivo', 'Linea', 'Estado', 'FechaCreacion', 'FechaValidado',];

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private ordenService: OrdenDeTrabajoService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getPreventivas();
  }

  getPreventivas() {
    this.ordenService.getOrdenes(1).subscribe(
      res => {
        this.dataSource.data = res
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      })
  }

  //Elimina la orden pasada por parámetro
  eliminar(ordenid:number, e:any){
    e.stopPropagation();
    if(confirm('¿Desea eliminar la orden?')){
      this.ordenService.deleteOrden(ordenid).subscribe(
      res => {
        this.getPreventivas()
      }, err => 
      this.snackBar.open('No se puede borrar la orden', 'Cerrar', {duration:2000, horizontalPosition:'center', verticalPosition:'top'})
      )
    }
    this.ordenService.deleteOrden(ordenid).subscribe
  }

  /*Filtros para mat-table */
  applyFilter() {
    this.dataSource.filter = this.searchKey.toLowerCase().trim();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  /*------------------------*/

}
