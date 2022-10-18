import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanExternaService } from 'src/app/services/planExterna/plan-externa.service';
import { ListadoPlanExterna } from 'src/app/models/PlanExterna/listadoPlanExterna';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-abrir-panel-plan-externa-dialog',
  templateUrl: './abrir-panel-plan-externa-dialog.component.html',
  styleUrls: ['./abrir-panel-plan-externa-dialog.component.css']
})
export class AbrirPanelPlanExternaDialogComponent implements OnInit {

  planExterna: any
  validado = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: number,
    public dialogRef: MatDialogRef<AbrirPanelPlanExternaDialogComponent>,
    private planExternaService: PlanExternaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPlanExternaById();
  }

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    if (this.validado) {
      this.planExternaService.validarPlanExternaById(this.data).subscribe(
        res => {
          this.snackBar.open('Validación aceptada.', '', { duration: 3000 });
          this.dialogRef.close();
          
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  validadoOnChange() {
    this.validado = !this.validado;
  }

  /** La variable ijectada data es el id */
  getPlanExternaById() {
    this.planExternaService.getPlanExternaById(this.data).subscribe(
      res => {
        this.planExterna = res[0];
        console.log(this.planExterna);
      },
      err => {
        console.log(err);
      }
    )
  }



}
