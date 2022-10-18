import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-ubicacion',
  templateUrl: './editar-ubicacion.component.html',
  styleUrls: ['./editar-ubicacion.component.css']
})
export class EditarUbicacionComponent implements OnInit {

  datos:any;

  nueva = this.fb.group({
    Denominacion: [''],
    Descripcion: ['']
  })


  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<EditarUbicacionComponent>,
  private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.nueva.patchValue(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelar():void{
    
    this.dialogRef.close();
  }
}
