import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TareaDeOt } from 'src/app/models/Tarea/TareaDeOT';
import { TareasService } from 'src/app/services/tareas/tareas.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

  tipoUsuario: number = Number(localStorage.getItem('tipoUsuario'))

  @ViewChild(MatPaginator, { static: false, read: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false, read: false }) sort!: MatSort;

  dataSource = new MatTableDataSource<TareaDeOt>()
  searchKey!: string;

  displayedColumns = ['TareaId', 'Descripcion', 'acciones'];
  columnsToDisplay = ['TareaId', 'Descripcion',]

  constructor(private tareaService: TareasService, public dialogRef: MatDialogRef<TareasComponent>,
    @Inject(MAT_DIALOG_DATA) public orden: any) { }

  ngOnInit(): void {
    this.getTareasDeOrden();
  }

  //Obtiene las tareas de una orden pasda por parámetro
  getTareasDeOrden() {
    this.tareaService.getTareasDeOrden(this.orden).subscribe(
      res => {
        this.dataSource.data = res
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      })
  }

  //Actualiza el estado de la orden de 0 lo actualiza a 1;  0 sin hacer. 1 hecho
  do(tareaid:number){
    this.tareaService.updateTareaDeOrden(tareaid).subscribe(
      res => this.getTareasDeOrden()
    )
  }

  cerrar()
  {
    this.dialogRef.close();
  }

  //Elimina la tarea de la orden
  eliminar(tareaid:number){
    this.tareaService.deleteTareaDeOrden(tareaid).subscribe(
      res => this.getTareasDeOrden()
    )
  }



  // FIltra la tabla
  applyFilter() {
    this.dataSource.filter = this.searchKey.toLowerCase().trim();
  }

  // Limpia el filtro
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

}
