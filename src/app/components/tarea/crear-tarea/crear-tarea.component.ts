import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css']
})
export class CrearTareaComponent implements OnInit {

  tareasI:string[] = [];

  form = this.fb.group({
    tareas: this.fb.array([]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CrearTareaComponent>, 
  private fb:FormBuilder){}

  /** Al iniciar se crear una tarea */
  ngOnInit(): void {
    this.addTarea();
  }
  /** Obtiene las tarea en forma de FormArray  */
  get tareas(){
    return this.form.controls["tareas"] as FormArray;
  }
  /** Añade un input para una nueva tarea */
  addTarea():void{
    const tareaForm = this.fb.group({
        desc: ['', Validators.required]
    });
    this.tareas.push(tareaForm)
  }
  /** Elimina una tarea individual */
  deleteTarea(tareaindex: number):void{
    this.tareas.removeAt(tareaindex)
  }
  /** Recorre el array de tareas y añade la descripción al array de tareasI para enviarlo en mat dialog close*/
  confirmar():void{
    for(let i=0; i<this.tareas.length; i++){
    this.tareasI.push(this.tareas.value[i]['desc'])}
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  cancelar():void{
    this.dialogRef.close();
  }
}