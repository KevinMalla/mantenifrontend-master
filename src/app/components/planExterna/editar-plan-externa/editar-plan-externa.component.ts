import { Component, OnInit, Inject, ɵɵqueryRefresh } from '@angular/core';
import { PlanExterna } from 'src/app/models/PlanExterna/planExterna';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanExternaService } from 'src/app/services/planExterna/plan-externa.service';
import { EmpresaExternaService } from 'src/app/services/empresa_externa/empresa-externa.service';
import { ListadoPlanExterna } from 'src/app/models/PlanExterna/listadoPlanExterna';
import { Periodicidad } from 'src/app/models/Periodicidad/Periodicidad';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { EmpresaExterna } from 'src/app/models/EmpresaExterna/EmpresaExterna';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isThisTypeNode } from 'typescript';


@Component({
  selector: 'app-editar-plan-externa',
  templateUrl: './editar-plan-externa.component.html',
  styleUrls: ['./editar-plan-externa.component.css']
})
export class EditarPlanExternaComponent implements OnInit {

  periodicidades: Periodicidad[] = [];
  empresasExternas: EmpresaExterna[] = [];
  estados: string[] = ["abierto", "cerrado"]

  planExterna: PlanExterna = {
    id: 0,
    idEmpresa: 0,
    descripcion: "",
    idPeriodicidad: 0,
    fecha: "",
    estado: ""
  }

  listadoPlanExterna: ListadoPlanExterna = {
    idPlanExterna: 0,
    idPeriodicidad: 0,
    idEmpresa: 0,
    Empresa: "",
    Descripcion: "",
    Periodicidad: "",
    Fecha: "",
    Estado: ""
  }

  formPlanExterna: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ListadoPlanExterna,
    public dialogRef: MatDialogRef<EditarPlanExternaComponent>,
    private formBuilder: FormBuilder,
    private periodicidadService: PeriodicidadService,
    private empresaExternaService: EmpresaExternaService,
    private planExternaService: PlanExternaService,
  ) { 
    this.formPlanExterna = formBuilder.group({
      idPeriodicidad: ['', Validators.required],
      idEmpresa: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.selectPeriodicidades();
    this.selectEmpresasExternas();
    this.listadoPlanExterna = this.data;
  }

  selectEmpresasExternas() {
    this.empresaExternaService.getEmpresasExternas().subscribe(
      res => this.empresasExternas = res,
      err => console.log(err)
    );
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  selectPeriodicidades() {
    this.periodicidadService.getPeriodicidad().subscribe(
      res => this.periodicidades = res,
      err => console.log(err)
    );
  }

  editar() {
    
    this.planExterna.id = this.data.id;

    this.planExterna.idEmpresa = this.formPlanExterna.get('idEmpresa')?.value;
    this.planExterna.idPeriodicidad = this.formPlanExterna.get('idPeriodicidad')?.value;
    this.planExterna.descripcion = this.formPlanExterna.get('descripcion')?.value;
    let tempFecha = new Date(this.formPlanExterna.get('fecha')?.value);
    this.planExterna.fecha = tempFecha.toISOString().split('T')[0]; 
    this.planExterna.estado = this.formPlanExterna.get('estado')?.value;
   
    this.updatePlanExterna(this.planExterna);
   
    this.cancelar();
  }

  updatePlanExterna(plan:PlanExterna) {
    this.planExternaService.updatePlanExterna(plan.id!, plan).subscribe(
      res => {
        console.log("Plan Externo actualizado.");
      },
      err => {
        console.log(err);
      }
    );
  }

}
