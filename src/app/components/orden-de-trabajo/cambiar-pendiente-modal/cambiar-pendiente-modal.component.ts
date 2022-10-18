import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Trabajador } from 'src/app/models/Operario/Trabajador';
import { Prioridad } from 'src/app/models/Prioridad/Prioridad';
import { OperarioService } from 'src/app/services/operario/operario.service';
import { PrioridadService } from 'src/app/services/prioridad/prioridad.service';

@Component({
  selector: 'app-cambiar-pendiente-modal',
  templateUrl: './cambiar-pendiente-modal.component.html',
  styleUrls: ['./cambiar-pendiente-modal.component.css']
})
export class CambiarPendienteModalComponent implements OnInit {

  trabajadores: Trabajador[] = []
  prioridades: Prioridad[] = []

  pendiente = this.fb.group({
    OperarioId: ['', Validators.required],
    PrioridadId: ['', Validators.required],
    ComentarioResponsable: [this.data.ComentarioResponsable]
  })

  constructor(
    public dialogRef: MatDialogRef<CambiarPendienteModalComponent>,
    private trabajadorService: OperarioService,
    private prioridadService: PrioridadService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    //Insertara en los campos la información traida de la orden para poder editarla
    this.pendiente.patchValue({OperarioId: this.data.OperarioId, PrioridadId: this.data.PrioridadId, ComentarioResponsable: this.data.ComentarioResponsable})
    this.getTrabajadores();
    this.getPrioridades();
  }

  //Obtiene los trabajadores para mostrarlos en el desplegable
  getTrabajadores(){
    this.trabajadorService.getUsuario().subscribe(
      res => this.trabajadores = res
    )
  }

  //Cargará en el desplegable las prioridades
  getPrioridades(){
    this.prioridadService.getPrioridades().subscribe(
      res => this.prioridades = res
    )
  }

  cancelar(){
    this.dialogRef.close();
  }
}
