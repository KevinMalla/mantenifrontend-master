import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UTPreventivo } from 'src/app/models/Preventivo/UtPreventivo';
import { UTPreventivoService } from 'src/app/services/UT_Preventivo/ut-preventivo.service';

@Component({
  selector: 'app-editar-fecha',
  templateUrl: './editar-fecha.component.html',
  styleUrls: ['./editar-fecha.component.css']
})
export class EditarFechaComponent implements OnInit {

  preventivo: UTPreventivo = {
    utprevid:0,
    FechaInicio: ""
  }

  semanaActual!:number
  fechaForm = this.fb.group({
    fecha: ['', Validators.required]
  })

  model!: NgbDateStruct;
  date!: {year: number, month: number};
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarFechaComponent>,
    public utpreventivo:UTPreventivoService,
    public snackbar: MatSnackBar,
    private calendar: NgbCalendar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.preventivo.utprevid = this.data.preventivo.utprevid
    this.semanaActual = this.data.numerosemana
  }

  //Al elegir una fecha del datepicker se formatea
  editarFecha(){
    let dateBd = formatDate(this.fechaForm.value.fecha, 'yyyy-MM-dd', 'en');
    this.preventivo.FechaInicio = dateBd
  }

  onNoClick():void{
    this.dialogRef.close();
  }

  cancelar():void{
    this.dialogRef.close();
  }

}
