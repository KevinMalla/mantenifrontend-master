import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/Operario/Usuario';
import { Preventivo } from 'src/app/models/Preventivo/Preventivo';
import { OperarioService } from 'src/app/services/operario/operario.service';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { PreventivoService } from 'src/app/services/preventivo/preventivo.service';

const PREVENTIVO_SCHEMA = {
  "PreventivoId": "number",
  "Descripcion": "text",
  "PeriodicidadId": "number",
  "Operario": "text",
  "isEdit": "isEdit"
}

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})


export class AdministrarComponent implements OnInit {

  displayedColumns: string [] = ['PreventivoId', 'Descripcion', 'Periodicidad', 'Operario','isEdit'];
  columnsToDisplay: string [] = ['Nº', 'Descripción', 'Periodicidad','Operario', 'Acciones']
  dataSource = new MatTableDataSource<Preventivo>();
  dataSchema = PREVENTIVO_SCHEMA;

  periodicidades:any[]=[]
  operarios:Usuario[] = []

  searchKey!: string;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private preventivoService:PreventivoService,
    private periodiciadService: PeriodicidadService,
    private operarioService:OperarioService
  ) { }

  ngOnInit(): void {
    this.getPreventivos();
    this.getPeriodicidades();
    this.getTrabajadores();
  }

//Obtiene los trabajadores para cargarlo en el desplegables
  getTrabajadores(){
    this.operarioService.getUsuario().subscribe(
      res => this.operarios = res
    )
  }

  //Obtiene los preventivos
  getPreventivos(){
    this.preventivoService.getPreventivos().subscribe(
      res => {
        this.dataSource.data = res
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      }
    )
  }
//Obtiene las periodicidades 
  getPeriodicidades(){
    this.periodiciadService.getPeriodicidad().subscribe(
      res => this.periodicidades = res
    )
  }
//Edita los preventivos; su descripcion, su operario asignado y su periodicidades
  editarPreventivo(preventivo:Preventivo){
   this.preventivoService.updatePreventivo(preventivo).subscribe(
     res=> this.getPreventivos()
     ,err => console.log(err)
   );
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
