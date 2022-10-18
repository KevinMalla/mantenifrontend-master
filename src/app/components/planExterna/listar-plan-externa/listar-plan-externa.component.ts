import { Component, OnInit, Inject } from '@angular/core';
import { PlanExterna } from 'src/app/models/PlanExterna/planExterna';
import { Externa } from 'src/app/models/Externa/Externa';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanExternaService } from 'src/app/services/planExterna/plan-externa.service';
import { ExternaService } from 'src/app/services/externa/externa.service';
import { ListadoPlanExterna } from 'src/app/models/PlanExterna/listadoPlanExterna';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditarPlanExternaComponent } from '../editar-plan-externa/editar-plan-externa.component';


@Component({
  selector: 'app-listar-plan-externa',
  templateUrl: './listar-plan-externa.component.html',
  styleUrls: ['./listar-plan-externa.component.css']
})
export class ListarPlanExternaComponent implements OnInit {

  listadoPlanExternas: ListadoPlanExterna[] = [];

  constructor(
    private planExternaService: PlanExternaService,
    private externaService: ExternaService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarListadoPlanExternas();
  }


  cargarListadoPlanExternas() {
    this.planExternaService.getAllPlanExternasRelacion().subscribe(
      res => {
        this.listadoPlanExternas = res;
        this.formatearListadoPlanExternas();
      },
      err => {
        console.log(err);
      }
    );
  }


  /* Iteración y formateo de la fecha en cada objeto */
  formatearListadoPlanExternas() {
    this.listadoPlanExternas.forEach(plan => {
      plan.Fecha = plan.Fecha.split('T')[0];
    });
  }

  editar(plan:ListadoPlanExterna) {
    let dialogEditar = this.dialog.open(EditarPlanExternaComponent, {
      width: '100%',
      height: '100%',
      data: plan
    });
    dialogEditar.afterClosed().subscribe(() => {
      this.refresh();
    });

  }

  borrar(plan:any) {
    console.log(plan)
    if (confirm(`¿Eliminar la planificación externa de ${plan.Empresa} ?`)) {
      this.planExternaService.deletePlanExterna(plan.id).subscribe(
        res => {
          this.snackBar.open("Planifiación externa eliminada.", "", { duration: 3000 });
          this.refresh();
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  
  refresh() {
    this.cargarListadoPlanExternas();
  }

}
