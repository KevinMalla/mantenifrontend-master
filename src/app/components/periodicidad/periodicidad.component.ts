import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Periodicidad } from 'src/app/models/Periodicidad/Periodicidad';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';

const MATERIAL_SCHEMA = {
  "PeriodicidadId": "number",
  "Dias": "number",
  "Descripcion": "text",
  "isEdit": "isEdit"
}

@Component({
  selector: 'app-periodicidad',
  templateUrl: './periodicidad.component.html',
  styleUrls: ['./periodicidad.component.css']
})
export class PeriodicidadComponent implements OnInit {

  columnsToDisplay = ['PeriodicidadId', 'Dias', 'Descripcion', 'isEdit'];

  displayedColumns: string[] = ['PeriodicidadId', 'Dias', 'Descripcion', "isEdit"]
  dataSource = new MatTableDataSource<Periodicidad>();
  dataSchema = MATERIAL_SCHEMA;



  periodicidad:Periodicidad = {
    Dias: 0,
    Descripcion: ''
  }


    searchKey!: string;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  constructor(private periodiciadService: PeriodicidadService,
     private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getPeriodicidad();
  }
// Obtiene las periodicidades
  getPeriodicidad(){
    this.periodiciadService.getPeriodicidad().subscribe(
      res => {
       this.dataSource.data = res
       this.dataSource.paginator = this.paginator
       this.dataSource.sort = this.sort
      }

    )
  }
//Elimina la periodicidad pasada por parámetro
  remove(PeriodiciadId:number)
  {
    this.periodiciadService.deletePeriodicidad(PeriodiciadId).subscribe(
      res => this.getPeriodicidad() 
      , err => this.snackBar.open("No se puede eliminar la periodicidad", "Cerrar", {duration: 2000, horizontalPosition:'center', verticalPosition:'top'})
    )
  }
//Edita la periodicidad
  editar(Periodicidad:Periodicidad){
    this.periodiciadService.updatePeriodicidad(Periodicidad).subscribe(
      res => this.getPeriodicidad()
    )
  }
//Añade una periodicidad a la lista 
  add(){
    this.periodiciadService.addPeriodicidad(this.periodicidad).subscribe(
      res => {
        this.getPeriodicidad();
        this.periodicidad = {
          Dias: 0,
          Descripcion: ''
        }
      }
    )
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
