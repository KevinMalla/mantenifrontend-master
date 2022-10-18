import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tarea } from 'src/app/models/Tarea/Tarea';
import { TareasService } from 'src/app/services/tareas/tareas.service';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.component.html',
  styleUrls: ['./editar-tarea.component.css']
})
export class EditarTareaComponent implements OnInit {

  tarea:Tarea = {
    TareaId: 0,
    Descripcion:''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tarea,
    public dialogRef: MatDialogRef<EditarTareaComponent>, 
  ) { }

  ngOnInit(): void {
    this.tarea=this.data
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cancelar():void{
    this.dialogRef.close();
  }
}