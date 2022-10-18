import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tarea } from 'src/app/models/Tarea/Tarea';
import { TareasService } from 'src/app/services/tareas/tareas.service';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.css']
})


export class AgregarTareaComponent implements OnInit {

  displayedColumns:string[] = ['select', 'TareaId', 'Descripcion']
  dataSource = new MatTableDataSource<Tarea>();
  selection = new SelectionModel<Tarea>(true, []);

  tareas:number[] = []
  
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  searchKey!: string;

  constructor(
  public dialogRef: MatDialogRef<AgregarTareaComponent>,
  private tareaService:TareasService,) { }

  ngOnInit(): void {
    this.selectTareas();
  }

  /** Carga las tareas en la tabla */
  selectTareas() {
    this.tareaService.getTareas().subscribe(
      res => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.error(err))
  }

  /** Inserta en el array de tareas los elementos seleccionados*/
  logSelection(){
    this.selection.selected.forEach(s => {
      this.tareas.push(Number(s.TareaId))
    })

  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: Tarea): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.TareaId}`;
  }
    /** --------------------------------------------------------------------------------- */

  /*Filtros para mat-table y eventos para salir*/
  applyFilter(){
    this.dataSource.filter = this.searchKey.trim();
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelar():void{
    this.dialogRef.close();
  }
  /*------------------------*/
}