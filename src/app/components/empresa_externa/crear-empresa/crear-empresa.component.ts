import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresaExterna } from 'src/app/models/EmpresaExterna/EmpresaExterna';
import { EmpresaExternaService } from 'src/app/services/empresa_externa/empresa-externa.service';


@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {

  empresaExterna: EmpresaExterna = {
    nombre: "",
    descripcion: ""
  }

  constructor(
    private empresaExternaService: EmpresaExternaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.empresaExterna);
    this.addEmpresaExterna(this.empresaExterna);
  }

  limpiarFormulario() {
    this.empresaExterna.nombre = "";
    this.empresaExterna.descripcion = "";
  }

  addEmpresaExterna(empresaExterna: EmpresaExterna) {
    this.empresaExternaService.addEmpresaExterna(this.empresaExterna).subscribe(
      res => {
        this.snackBar.open("Empresa Externa añadida", "", { duration: 3000 });
        this.limpiarFormulario();
      },
      err => {
        console.log(err.error);
      }
    );
  }

}
