import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Trabajador } from 'src/app/models/Operario/Trabajador';
import { Usuario } from 'src/app/models/Operario/Usuario';
import { OperarioService } from 'src/app/services/operario/operario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-operario',
  templateUrl: './operario.component.html',
  styleUrls: ['./operario.component.css']
})
export class OperarioComponent implements OnInit {

  dataSource = new MatTableDataSource<Trabajador>();
  trabajadores!: Trabajador[];
  searchKey!: string;
  selection = new SelectionModel<Trabajador>(false, []);

  displayedColumns: string[] = ['CodigoTrabajador', 'Nombre', 'select']

  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('paginator')
  paginator!: MatPaginator;

  /**---- */

  dataSourceUsers = new MatTableDataSource<Usuario>();
  usuarios!: Usuario[];
  searchKeyUser!: string;

  displayedColumnsUsers: string[] = ['Codigo', 'Nombre', 'acciones']

  @ViewChild('matSortUser')
  sortUser!: MatSort;
  @ViewChild('paginatorUser', { static: true })
  paginatorUser!: MatPaginator;

  constructor(
    private operarioService: OperarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.selectTrabajadores();
    this.selectUsuarios();
  }

  //Obtiene los trabajadores de la tabla trabajadores
  selectTrabajadores() {
    this.operarioService.getTrabajador().subscribe(
      res => {
        this.dataSource.data = res
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      err => console.log(err)
    )
  }

  //Obtiene los usuarios y los carga en la tabla
  selectUsuarios() {
    this.operarioService.getUsuario().subscribe(
      res => {
        this.dataSourceUsers.data = res
        this.dataSourceUsers.paginator = this.paginatorUser
        this.dataSourceUsers.sort = this.sortUser
      },
      err => console.log(err.error.message)
    )
  }

  //Convertir a usuario; convierte un trabajador de la tabla trabajadores a la tabla usuario con tipo 6 y la contraseña hasheada
  convertirAUser(seleccionado: SelectionModel<Trabajador>):void {
    try {
      this.operarioService.trabajadorToUser(String(this.selection.selected[0].CodigoTrabajador), this.selection.selected).subscribe(
        (res: any) => {
          this.snackBar.open(res.message, "", { duration: 2000 })
          this.selectUsuarios();
          alert("La contraseña del trabajdor " + seleccionado.selected[0].Nombre + " es: " + seleccionado.selected[0].Password)
          this.selection.deselect(seleccionado.selected[0])
        },
        err => this.snackBar.open(err.error.message, "", {duration: 2000})
      )
    } catch (error) {
      this.snackBar.open("Debe elegir un trabajador", "", { duration: 2000 })
    }
  }
  //Elimina el usuario de la tabla de usuario pero NO de la tabla trabajadores
  delete(codigo: string): void {
    if (confirm("¿Desea eliminar el usuario?")) {
      this.operarioService.deleteUser(codigo).subscribe(
        (res: any) => {
          this.snackBar.open(res.message, "", { duration: 2000 })
          this.selectUsuarios();
        },
      err => console.log(err.error.message)
      )
    }
  }
  /*Filtros para mat-table y eventos para salir*/
  applyFilterUser() {
    this.dataSourceUsers.filter = this.searchKeyUser.trim();
  }
  onSearchClearUser() {
    this.searchKeyUser = "";
    this.applyFilterUser();
  }
  /*------------------------*/

  /*Filtros para mat-table y eventos para salir*/
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  /*------------------------*/

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
  checkboxLabel(row?: Trabajador): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.CodigoTrabajador}`;
  }
  /** --------------------------------------------------------------------------------- */
}