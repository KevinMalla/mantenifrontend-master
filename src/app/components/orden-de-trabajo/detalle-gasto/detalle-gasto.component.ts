import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialService } from 'src/app/services/material/material.service';
import { Gasto } from 'src/app/models/Material/Gasto'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GastoMaterialService } from 'src/app/services/gastoMaterial/gasto-material.service';

@Component({
  selector: 'app-detalle-gasto',
  templateUrl: './detalle-gasto.component.html',
  styleUrls: ['./detalle-gasto.component.css']
})
export class DetalleGastoComponent implements OnInit {

  @ViewChild(MatPaginator, {static:false, read:false}) paginator!:MatPaginator;
  @ViewChild(MatSort, {static:false, read:false}) sort!:MatSort;

  dataSource = new MatTableDataSource<Gasto>()
  searchKey!:string;

  displayedColumns = ['Nombre', 'Material', 'Descripcion', 'Cantidad', 'Fecha',  'acciones'];
  columnsToDisplay = ['Nombre', 'Material', 'Descripcion', 'Cantidad', 'Fecha' ]

  constructor(private materialService:MaterialService,public dialogRef: MatDialogRef<DetalleGastoComponent>,
    @Inject(MAT_DIALOG_DATA) public orden: any,
    private gastoService:GastoMaterialService) { }

  ngOnInit(): void {
    this.getMaterial();
  }

  //Obtiene todos los materiales para cargarlo en el desplegable
  getMaterial(){

    this.gastoService.getMaterialDeOrden(this.orden).subscribe(
      res => {
        this.dataSource.data = res
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    )
  }

  //Elimina el material utilizado de la orden
  remove(gastoid:number){
    this.gastoService.deleteMaterialOrden(gastoid, this.orden).subscribe(
      res => this.getMaterial()
    )
  }

  cerrar()
  {
    this.dialogRef.close();
  }

    // FIltra la tabla
    applyFilter(){
      this.dataSource.filter = this.searchKey.toLowerCase().trim();
    }
  
    // Limpia el filtro
    onSearchClear(){
      this.searchKey = "";
      this.applyFilter();
    }

}
