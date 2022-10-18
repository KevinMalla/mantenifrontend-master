import { formatDate } from '@angular/common';
import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Estado } from 'src/app/models/Estado/Estado';
import { Material } from 'src/app/models/Material/Material';
import { OrdenDeTrabajo } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajo';
import { Prioridad } from 'src/app/models/Prioridad/Prioridad';
import { EstadoService } from 'src/app/services/estado/estado.service';
import { MaterialService } from 'src/app/services/material/material.service';
import { OrdenDeTrabajoService } from 'src/app/services/orden-de-trabajo/orden-de-trabajo.service';
import { PrioridadService } from 'src/app/services/prioridad/prioridad.service';
import { DetalleGastoComponent } from '../detalle-gasto/detalle-gasto.component';
import { TareasComponent } from '../tareas/tareas.component';
import { DatePipe } from '@angular/common';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { GastoMaterialService } from 'src/app/services/gastoMaterial/gasto-material.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {
  id!:number

  ordenDeTrabajo: OrdenDeTrabajo = {
    OrdenId: 0,
    FechaCreacion: '',
    FechaPendiente: '',
    FechaTerminado: '',
    FechaValidado: '',
    EstadoId: 0,
    PrioridadId: 0,
    OperarioId: 0,
    PersonaResponsable: 0,
    DescripcionCorrectivo: '',
    UbicacionTecnica: '',
    TituloCorrectivo: '',
    Estado: '',
    Tipo: '',
    TiempoEmpleado: 0,
    Operario: '',
    Prioridad: '',
    Preventivo: '',
    ComentarioResponsable: '',
    Comentario: '',
    TipoId: 0,
    Planta: 0
  }

  material: Material = {MatId:0, Material:'',Descripcion:''}
  cantidad:number = 0
  proximaRevi!: Date;
  materiales: Material[] = []
  prioridades: Prioridad[] = []
  estados: Estado[] = []

  
  tipoUsuario: number = Number(localStorage.getItem('tipoUsuario'))
  operarioId: number = Number(localStorage.getItem('trabajadorMantenimiento'))

  constructor(
    private snackBar: MatSnackBar,
    private materialService: MaterialService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private ordenService:OrdenDeTrabajoService,
    private fb: FormBuilder,
    private prioridadService: PrioridadService,
    private estadoService: EstadoService,
    private datepipe : DatePipe,
    private gastoService:GastoMaterialService
  ) { }

  ngOnInit(): void {
    //Obtiene los datos de la orden pasada por parámetro 
    const params = this.activatedRoute.snapshot.params;
    this.id = params.ordenid
    this.selectOrden(this.id);
    this.getMaterial();
    this.getPrioridades();
    this.getEstados();
    this.getMaterial(); 

   if(this.ordenDeTrabajo.TipoId==1)
   {
    this.proximaRevi = new Date() 
    this.proximaRevi.setDate(this.proximaRevi.getDate() + this.ordenDeTrabajo.Dias!);
   }
  }
  selectOrden(ordenid:number){
    this.ordenService.getOrden(ordenid).subscribe(
      res => {
        this.ordenDeTrabajo = res
      }
    )
  }

  getMaterial(){
    this.materialService.getMaterial().subscribe(
        res => this.materiales = res
    ) 
  }

  getPrioridades(){
    this.prioridadService.getPrioridades().subscribe(
      res => {this.prioridades= res}
      , err => console.log(err))
  }

  getEstados(){
    this.estadoService.getEstados().subscribe(
      res => this.estados = res
    )
  }

  agregarMaterial(){
    if(this.material.MatId==0 || this.cantidad==0)
    {
      this.snackBar.open("Debe elegir material y cantidad", "Cerrar" ,{ duration:2000, verticalPosition: 'top', horizontalPosition:'center'})
      return;
    } 
    let operario = Number(localStorage.getItem('trabajadorMantenimiento'))
    this.gastoService.addGastoMaterialAOrden(this.ordenDeTrabajo.OrdenId!,this.material.MatId!, this.cantidad, operario).subscribe(
    res=> {   
      this.snackBar.open("Material añadido", "Cerrar", {duration:2000, horizontalPosition:'center', verticalPosition:'top'})
    }, err => console.log(err)
    )
  }

  verDetalleGasto(){
    const dialog1 = this.dialog.open(DetalleGastoComponent,{
      width: 'auto',
      height: 'auto',
      data: this.id,
      panelClass: 'custom-dialog-container'
    })
  }

  //Elimina las propiedades de la ordendetrabajo que no sean editables
  guardar(){
    let ordenid = this.ordenDeTrabajo.OrdenId!
    delete this.ordenDeTrabajo.OrdenId
    delete this.ordenDeTrabajo.OperarioId
    delete this.ordenDeTrabajo.PersonaResponsable
    delete this.ordenDeTrabajo.DescripcionCorrectivo
    delete this.ordenDeTrabajo.UbicacionTecnica
    delete this.ordenDeTrabajo.TituloCorrectivo
    delete this.ordenDeTrabajo.Estado
    delete this.ordenDeTrabajo.Tipo
    delete this.ordenDeTrabajo.Operario
    delete this.ordenDeTrabajo.Prioridad
    delete this.ordenDeTrabajo.Preventivo
    delete this.ordenDeTrabajo.TipoId
    delete this.ordenDeTrabajo.Planta
    delete this.ordenDeTrabajo.Localizacion
    delete this.ordenDeTrabajo.Equipo
    delete this.ordenDeTrabajo.Dias
  
    //Si las fechas de la orden han sido editadas las formateará
    if(this.ordenDeTrabajo.FechaCreacion)this.ordenDeTrabajo.FechaCreacion = new Date(this.datepipe.transform(this.ordenDeTrabajo.FechaCreacion, 'yyyy-MM-dd')!).toISOString()    
    if(this.ordenDeTrabajo.FechaPendiente)this.ordenDeTrabajo.FechaPendiente = new Date(this.datepipe.transform(this.ordenDeTrabajo.FechaPendiente, 'yyyy-MM-dd')!).toISOString();
    if(this.ordenDeTrabajo.FechaTerminado)this.ordenDeTrabajo.FechaTerminado = new Date(this.datepipe.transform(this.ordenDeTrabajo.FechaTerminado, 'yyyy-MM-dd')!).toISOString();
    if(this.ordenDeTrabajo.FechaTerminado)this.ordenDeTrabajo.FechaTerminado = new Date(this.datepipe.transform(this.ordenDeTrabajo.FechaTerminado, 'yyyy-MM-dd')!).toISOString();

    //Envíala orden para se editada
    this.ordenService.updateOrdenDeTrabajo(ordenid,this.ordenDeTrabajo).subscribe(
      res => {
        console.log(res)     
        this.ngOnInit(); 
      }
    )
  }

  //Abrea el listado de tareas asocada a esa orden
  abrirListadoTareas(){
    const dialog1 = this.dialog.open(TareasComponent,{
      width: 'auto',
      height: 'auto',
      data: this.id,
      panelClass: 'custom-dialog-container'
    })
  }
}
