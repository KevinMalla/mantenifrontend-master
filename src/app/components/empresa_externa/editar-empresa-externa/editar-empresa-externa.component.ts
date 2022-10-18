import { Component, OnInit, Inject } from '@angular/core';
import { EmpresaExterna } from 'src/app/models/EmpresaExterna/EmpresaExterna';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresaExternaService } from 'src/app/services/empresa_externa/empresa-externa.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-editar-empresa-externa',
  templateUrl: './editar-empresa-externa.component.html',
  styleUrls: ['./editar-empresa-externa.component.css']
})
export class EditarEmpresaExternaComponent implements OnInit {

  empresaExterna: EmpresaExterna = {
    id: 0,
    nombre: "",
    descripcion: ""
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmpresaExterna,
    private empresaExternaService: EmpresaExternaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditarEmpresaExternaComponent>,
  ) { }

  ngOnInit(): void {
    this.empresaExterna = this.data
  }


  cancelar(): void {
    this.dialogRef.close();
  }


}
