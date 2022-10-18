import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Material } from 'src/app/models/Material/Material';
import { MaterialService } from 'src/app/services/material/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  columnsToDisplay = ['MatId', 'Material', 'Descripcion'];

  displayedColumns: string[] = ['MatId', 'Material', 'Descripcion', 'Acciones']
  dataSource = new MatTableDataSource<Material>();

  searchKey!: string;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  material: Material = {
    MatId: 0,
    Material: '',
    Descripcion: ''
  }

  constructor(
    private materialService: MaterialService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMateriales();
  }

  //Obtiene TODOS los materiales 
  getMateriales() {
    this.materialService.getMaterial().subscribe(
      res => {
        this.dataSource.data = res
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
      })
  }

  //Añade una material a la lista de materiales 
  addMaterial() {
    this.materialService.addMaterial(this.material).subscribe(
      res => {
        this.material.Descripcion = ''
        this.material.Material=''
        this.getMateriales();
      }, err => this.snackbar.open("No se ha podido añadir el material", "Cerrar", {duration:2000, verticalPosition:'top', horizontalPosition:'center'})
    )
  }

  //Elimina un material
  remove(MatId: number) {
    if (confirm('¿Desea eliminar el material?')) {
      this.materialService.deleteMaterial(MatId).subscribe(
        res => {
          this.snackbar.open("Material eliminado", "Cerrar", { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' })
          this.getMateriales();
        }
        , err => this.snackbar.open("No se ha podido eliminar el material", "Cerrar", { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' })
      )
    }
  }

  //Actualiza un material
  updateMaterial(material: any, property: string, e: any) {
    let editField = e.target.innerText
    if (editField != material[property]) {
      material[property] = editField
      this.materialService.updateMaterial(material).subscribe(
        res => {
          this.snackbar.open("Se ha actualizado el material", "Cerrar", { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' });
        }
      )
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
