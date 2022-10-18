import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Gasto } from 'src/app/models/Material/Gasto';
import { GastoMaterialService } from 'src/app/services/gastoMaterial/gasto-material.service';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-gestionar-gasto',
  templateUrl: './gestionar-gasto.component.html',
  styleUrls: ['./gestionar-gasto.component.css']
})
export class GestionarGastoComponent implements OnInit {

  columnsToDisplay =  ['Nombre', 'Material', 'Descripcion', 'Cantidad', 'Fecha', 'Linea' , 'OrdenId' ];
  displayedColumns =  ['Nombre', 'Material', 'Descripcion', 'Cantidad', 'Fecha', 'Linea' , 'OrdenId' ];
  
  searchKey!: string;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Gasto>();
  datos = new MatTableDataSource<Gasto>();
  filtro: number = 0;

  constructor(private materialService: MaterialService, private gastoService:GastoMaterialService) { }

  ngOnInit(): void {
    this.getGastoGeneral();
  }

  //Obtiene todos los gastos de materiales 
  getGastoGeneral(){
    this.gastoService.getGastoMaterial().subscribe(
      res => {
       this.datos.data = res
       this.dataSource.data = this.datos.data    
       this.dataSource.paginator = this.paginator
       this.dataSource.sort = this.sort   
      }

    )
  }

  //Actualiza los registros de valor descontado 0 a 1
  darPorDescontado(){
    this.gastoService.updateGastoMaterial().subscribe(
      res => {
        this.getGastoGeneral();
        this.filtrar(0);
      }
    )
  }

  //Filtra los registros por descontado 0 o 1
  filtrar(filtro:number){
    this.filtro = filtro

    if(this.filtro==0){
    this.dataSource.data = this.datos.data
    }else if(this.filtro==1) {
    this.dataSource.data = this.datos.data.filter( dato => dato.Descontado==1)
    }
    else if(this.filtro==2){
      this.dataSource.data = this.datos.data.filter( dato => dato.Descontado==0)
    }
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
