import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PlanExternaService } from 'src/app/services/planExterna/plan-externa.service';
import { AbrirPanelPlanExternaDialogComponent } from '../abrir-panel-plan-externa-dialog/abrir-panel-plan-externa-dialog.component';


@Component({
  selector: 'app-panel-plan-externa',
  templateUrl: './panel-plan-externa.component.html',
  styleUrls: ['./panel-plan-externa.component.css']
})
export class PanelPlanExternaComponent implements OnInit {

  meses: string[] = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL',                  // Fila 0
                      'MAYO', 'JUNIO', 'JULIO', 'AGOSTO',                   // Fila 1
                      'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];   // Fila 2
  anoActual: string = new Date().getFullYear().toString();
  mesesAMostrar: string[] = [];
  panel: any = {                   // 12 meses -> 3 filas x 4 columnas | indices x meses.
    'row1': [],
    'row2': [],
    'row3': []
  };

  planesPendientes: any = {
    ENERO: [],
    FEBRERO: [],
    MARZO: [],
    ABRIL: [],
    MAYO: [],
    JUNIO: [],
    JULIO: [],
    AGOSTO: [],
    SEPTIEMBRE: [],
    OCTUBRE: [],
    NOVIEMBRE: [],
    DICIEMBRE: []
  };

  constructor(
    private planExternaService: PlanExternaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.setUpPanel();
    this.getPlanesPendientes();
    
  }

  openDialog(id: number) {
  
    let dialogAbrirPlan = this.dialog.open(AbrirPanelPlanExternaDialogComponent, {
      width: '40%',
      height: '60%',
      data: id
    });
    
    dialogAbrirPlan.afterClosed().subscribe(() => {
      // First clear the data
      this.clearPanelData();
      this.getPlanesPendientes();
    });
    
  }

  clearPanelData() {
    this.planesPendientes = {
      ENERO: [],
      FEBRERO: [],
      MARZO: [],
      ABRIL: [],
      MAYO: [],
      JUNIO: [],
      JULIO: [],
      AGOSTO: [],
      SEPTIEMBRE: [],
      OCTUBRE: [],
      NOVIEMBRE: [],
      DICIEMBRE: []
    }
  }

  /* 
    Las tarjetas a mostrar empiezan desde el més actual.
    Inicializamos la variable mesesAMostrar en su orden correspondiente 
  */
  setUpPanel() {
    let cd = new Date();
    let mesesAMostrar = this.meses.slice(cd.getMonth()).concat(this.meses.slice(0, cd.getMonth()));
    this.panel.row1 = mesesAMostrar.slice(0, 4);
    this.panel.row2 = mesesAMostrar.slice(4, 8);
    this.panel.row3 = mesesAMostrar.slice(8);
  }

  /** Obtiene los planes externos en estado abierto */
  getPlanesPendientes() {
    this.planExternaService.getPlanExternasAbiertas().subscribe(
      res => {
        let planExternas: any = res;
        planExternas.forEach((element:any) => {
          
          let mes = new Date(element.Fecha).getMonth(); // indice del mes correspondiente --> this.meses
          let empresa = element.Empresa;
          let id = element.id;
          let dia = new Date(element.Fecha).getUTCDate();

          let plan = {'id':id, 'empresa':empresa, 'dia':dia};
          this.planesPendientes[this.meses[mes]].push(plan);
          
        });
      },
      err => {
        console.log(err);
      }
    )
  }

}
