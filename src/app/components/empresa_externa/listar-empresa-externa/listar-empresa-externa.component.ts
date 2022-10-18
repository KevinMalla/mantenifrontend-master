import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresaExternaService } from 'src/app/services/empresa_externa/empresa-externa.service';
import { EmpresaExterna } from 'src/app/models/EmpresaExterna/EmpresaExterna';
import { EditarEmpresaExternaComponent } from '../editar-empresa-externa/editar-empresa-externa.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-listar-empresa-externa',
  templateUrl: './listar-empresa-externa.component.html',
  styleUrls: ['./listar-empresa-externa.component.css']
})
export class ListarEmpresaExternaComponent implements OnInit {

  empresasExternas: EmpresaExterna[] = []; 
  empresaExterna : EmpresaExterna = {
    id: 0,
    nombre: "",
    descripcion: ""
  }

  constructor(
    private empresaExternaService: EmpresaExternaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.cargarListadoEmpresasExternas();
  }

  cargarListadoEmpresasExternas() {
    this.empresaExternaService.getEmpresasExternas().subscribe(
      res => {
        this.empresasExternas = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  editar(empresa: any) {
    let dialogEditar = this.dialog.open(EditarEmpresaExternaComponent, {
      width: '100%',
      height: '100%',
      data: empresa
    });
    dialogEditar.afterClosed().subscribe(empresa => {
      if (empresa != undefined) {
        this.empresaExternaService.updateEmpresaExterna(empresa.id, empresa).subscribe(
          (res: any) => {
            this.snackBar.open(res.message, "", { duration: 2000 });
            this.refresh();
          },
          err => {
            this.snackBar.open(err.error.message, "", { duration: 2000 });
            console.log(err);
          }
        )
      }
    });
  }

  borrar(empresa: any) {
    if (confirm(`¿Eliminar Empresa Externa ${empresa.nombre}?\nSe eliminaran las planificaciones asignadas a esa empresa.`)) {
      this.empresaExternaService.deleteEmpresaExterna(empresa.id).subscribe(
        res => {
          this.snackBar.open("Empresa Externa eliminada.", "", { duration: 3000 });
          this.refresh();
        },
        err =>  {
          console.log(err);
        }
      );
    }
  }

  refresh() {
    this.cargarListadoEmpresasExternas();
  }

}
