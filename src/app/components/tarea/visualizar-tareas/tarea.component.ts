import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { PreventivoService } from 'src/app/services/preventivo/preventivo.service';
import  { Tarea } from '../../../models/Tarea/Tarea';
import { Preventivo } from '../../../models/Preventivo/Preventivo'
import { CrearTareaComponent } from '../crear-tarea/crear-tarea.component';

import * as XLSX from 'xlsx';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditarTareaComponent } from '../editar-tarea/editar-tarea.component';
import { AgregarTareaComponent } from '../agregar-tarea/agregar-tarea.component';
const EXCEL_EXTENSION = '.xlsx'

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit{

  dataSource = new MatTableDataSource<Tarea>();
  preventivos!: Preventivo[];
  searchKey!: string;

  selectedItem:number=0;//ID de preventivo seleccionado en el desplegable

  displayedColumns:string[] = ['TareaId', 'Descripcion', 'Estado' , 'acciones'];

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private tareaService:TareasService, 
    private preventivoService: PreventivoService, 
    private dialog: MatDialog,
    private snackbar: MatSnackBar) {}

  ngOnInit(): void {
  this.onChange(this.selectedItem);/*Inicia seleccionando 0 es decir, todas las tareas*/
  this.selectPreventivos();/*Carga los preventivos en el desplegable*/
  }

  /*Trae todas las tareas*/
  selectTareas() {
    this.tareaService.getTareas().subscribe(
      res => {
        this.dataSource.data = res
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => console.error(err))}

  /*Muestra preventivos en desplegable*/
  selectPreventivos(){
    this.preventivoService.getPreventivos().subscribe(
      res => {
        //res[0].Descripcion = 'Todos'
        this.preventivos = res;
      },
      err => console.error(err))}

  /*Trae tarea por preventivo*/
  selectTareasDePreventivo(){
    this.tareaService.getTareasDePreventivo(this.selectedItem).subscribe(
      res => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      err => {console.error(err.error.message)
        this.snackbar.open(err.error.message, "Cerrar",{horizontalPosition:'center', verticalPosition:'top', duration:2000})
        this.dataSource.data = []
      }
      )}

  /*Filtros para mat-table */
  applyFilter(){
    this.dataSource.filter = this.searchKey.toLowerCase().trim();
  }
  onSearchClear(){
    this.searchKey = "";
    this.applyFilter();
  }
  /*------------------------*/

  /** Elimina la tarea de la lista de tareas, si la tarea no esta asignada */
  delete(TareaId:number){
    if(confirm("¿Desea eliminar la tarea?")){
      this.tareaService.deleteTarea(TareaId).subscribe(
        (res:any) => {
          this.snackbar.open(res.message,"",{duration: 2000})
          this.onChange(this.selectedItem)
        },
        err => console.error(err))
    }
    }

    /** Elimina la tarea del preventivo, pero no la elimina de la lista de tareas, pasa a estar no asignada */
  desasociarPrev(PrevId:number,TareaId:number){
    if(confirm("¿Desea eliminar la tarea del preventivo?")){
    this.tareaService.deleteTareaPrev(PrevId, TareaId).subscribe(
      (res:any) => {
        this.snackbar.open(res.message,"",{duration: 2000})
        this.onChange(this.selectedItem)
      },
      err => console.error(err))
    }
  };

  /*Obtiene el ID del preventivo seleccionado en el desplegable y con el ID hace busqueda. */
  onChange(newValue:number){
    this.selectedItem = Number(newValue);
    if(this.selectedItem == 0){/**/
      this.selectTareas();
    }else{
      this.selectTareasDePreventivo();
    }
  }

  /*Abre dialogo para crear tarea y al cerrarlo habrá obtenido las descripciones de las tareas y las insertada en la tabla de tareas*/
  abrirCrear(){
    const dialogo1 = this.dialog.open(CrearTareaComponent, {
      width: '40%'
    })
    dialogo1.afterClosed().subscribe(tarea => {
      if(tarea != undefined){
        this.tareaService.insertTarea(tarea).subscribe(
          (res:any) => {
            this.snackbar.open(res.message,"",{duration: 2000})
            this.onChange(this.selectedItem)
          },
          err => console.error(err)
        )   
      }
    });
  }

  /** Abre el diálogo para editar la descripción de las tareas */
 abrirEditar(tarea:Tarea){
    const dialogo1 = this.dialog.open(EditarTareaComponent, {
      width: '50%',
      height: '25%',
      data: tarea
    })
    dialogo1.afterClosed().subscribe(tarea => {
      if(tarea != undefined){
        this.tareaService.updateTarea(tarea.TareaId,tarea).subscribe(
          (res:any)=> {
            this.snackbar.open(res.message,"",{duration: 1000})
            this.onChange(this.selectedItem)
          },
          err => console.error(err)
        )
      }
    });
  }

  /** Abre el diálogo para agregar tareas a preventivo */
  abrirAgregar() {
    const dialogo1 = this.dialog.open(AgregarTareaComponent, {
      width: '50%',
      height: '80%'
    })

    dialogo1.afterClosed().subscribe(tareas => {
      if (tareas != undefined) {
        this.tareaService.insertTareaPrev(this.selectedItem, tareas).subscribe(
          (res: any) => {
            this.snackbar.open(res.message, "", { duration: 2000 })
            this.onChange(this.selectedItem)
          },
          err => {
            this.snackbar.open(err.error.message, "", { duration: 5000 })
            console.error(err)
          }
        )
      }
    })
  }
}