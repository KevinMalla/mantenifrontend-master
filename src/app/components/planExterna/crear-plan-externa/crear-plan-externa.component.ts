import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanExterna } from 'src/app/models/PlanExterna/planExterna';
import { PlanExternaService } from 'src/app/services/planExterna/plan-externa.service';
import { Periodicidad } from 'src/app/models/Periodicidad/Periodicidad';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { Externa } from 'src/app/models/Externa/Externa';
import { ExternaService } from 'src/app/services/externa/externa.service';
import { last } from 'rxjs/operators';
import { EmpresaExterna } from 'src/app/models/EmpresaExterna/EmpresaExterna';
import { EmpresaExternaService } from 'src/app/services/empresa_externa/empresa-externa.service';


@Component({
  selector: 'app-crear-plan-externa',
  templateUrl: './crear-plan-externa.component.html',
  styleUrls: ['./crear-plan-externa.component.css']
})
export class CrearPlanExternaComponent implements OnInit {

  periodicidades: Periodicidad[] = [];
  empresasExternas: EmpresaExterna[] = [];
  lastId: number = 0;
  fechaExterna: string = "";

  planExterna: PlanExterna = {
    idPeriodicidad: 1,
    idEmpresa: 1,
    descripcion: "",
    fecha: "",
    estado: "abierto",
    proximaFecha: ""
  }

  formPlanExterna: FormGroup = new FormGroup({});

  constructor(
    private planExternaService: PlanExternaService,
    private periodicidadService: PeriodicidadService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private externaService: ExternaService,
    private empresaExternaService: EmpresaExternaService
  ) { 
    this.formPlanExterna = formBuilder.group({
      idPeriodicidad: ['', Validators.required],
      idEmpresa: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.selectPeriodicidades();
    this.cargarEmpresasExternas();
    //this.getUltimosRegistros()
  }

  /** Limpia el formulario y el diccionario <<planExterna>> */
  clearEverything() {
    this.planExterna.idPeriodicidad = 1;
    this.planExterna.estado = "abierto";
    this.planExterna.descripcion = "";
    this.planExterna.idEmpresa = 1;
    this.planExterna.fecha = "";
    this.formPlanExterna.reset();
  }

  onSubmit() {
    this.planExterna.idEmpresa = this.formPlanExterna.get('idEmpresa')?.value;
    this.planExterna.idPeriodicidad = this.formPlanExterna.get('idPeriodicidad')?.value;
    this.planExterna.descripcion = this.formPlanExterna.get('descripcion')?.value;
    let tempFecha = new Date(this.formPlanExterna.get('fecha')?.value);                   // Paso intermedio para adecuar el formato de la fecha
    this.planExterna.fecha = tempFecha.toISOString().split("T")[0];
    this.calcularProximaFecha(tempFecha);

    

  }

  /* Calcula la proxima fecha a partir de la fecha introducida y la periodicidad */
  calcularProximaFecha(fecha:Date) {
    this.periodicidadService.getPeriodicidadPorId(this.planExterna.idPeriodicidad!).subscribe(
      res => {
        let dias = res[0].Dias;
        let proximaFecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + dias);  
        this.planExterna.proximaFecha = proximaFecha.toISOString().split("T")[0];
        console.log(this.planExterna);
        this.addPlanExterna(this.planExterna);
      }, 
      err => {
        console.log(err);
      }
    );

  }

  addPlanExterna(planExterna: PlanExterna) {
    this.planExternaService.addPlanExterna(planExterna).subscribe(
      res => {
        this.snackBar.open("Nuevo plan externa añadido.", "", { duration: 3000 });
        this.clearEverything();
      },
      err => {
        console.log(err.error);
      }
    );
  }

  selectPeriodicidades() {
    this.periodicidadService.getPeriodicidad().subscribe(
      res => this.periodicidades = res,
      err => console.log(err)
    );
  }


  cargarEmpresasExternas() {
    
    this.empresaExternaService.getEmpresasExternas().subscribe(
      res => {
        this.empresasExternas = res;
      },
      err => {
        console.log(err.error);
      }
    );
  }

}
