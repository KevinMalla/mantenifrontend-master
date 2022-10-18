import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrdenDeTrabajoCorrectiva } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajoCorrectiva';
import { Area } from 'src/app/models/ubicacion-tecnica/Area';
import { Planta } from 'src/app/models/ubicacion-tecnica/Planta';
import { AreasService } from 'src/app/services/ubicacion-tecnica/area/areas.service';
import { PlantasService } from 'src/app/services/ubicacion-tecnica/planta/plantas.service';
import { ZonasService } from 'src/app/services/ubicacion-tecnica/zona/zonas.service';
import { Zona } from 'src/app/models/ubicacion-tecnica/Zona';
import { SeccionesService } from 'src/app/services/ubicacion-tecnica/seccion/secciones.service';
import { CodigosService } from 'src/app/services/ubicacion-tecnica/codigo/codigos.service';
import { GruposService } from 'src/app/services/ubicacion-tecnica/grupo/grupos.service';
import { EquiposService } from 'src/app/services/ubicacion-tecnica/equipo/equipos.service';
import { Seccion } from 'src/app/models/ubicacion-tecnica/Seccion';
import { Codigo } from 'src/app/models/ubicacion-tecnica/Codigo';
import { Grupo } from 'src/app/models/ubicacion-tecnica/Grupo';
import { Equipo } from 'src/app/models/ubicacion-tecnica/Equipo';
import { OrdenDeTrabajoService } from 'src/app/services/orden-de-trabajo/orden-de-trabajo.service';
import { PrioridadService } from 'src/app/services/prioridad/prioridad.service';
import { Prioridad } from 'src/app/models/Prioridad/Prioridad';

@Component({
  selector: 'app-crear-correctivo',
  templateUrl: './crear-correctivo.component.html',
  styleUrls: ['./crear-correctivo.component.css']
})
export class CrearCorrectivoComponent implements OnInit {

  ordenCorrectiva: OrdenDeTrabajoCorrectiva = {
    EstadoId: 0,
    TipoId:0,
    PrioridadId:0,
    OperarioId:0,
    PersonaResponsable: '',    
    DescripcionCorrectivo: '',
    Resolucion: '',
    Planta: 0,
    Area: 0,
    Zona:0,
    Seccion:0,
    Codigo:0,
    Grupo:0,
    Equipo:0,
    TituloCorrectivo: '',
  }

  firstFormGroup = this.fb.group({
    firstCtrl: ['', [Validators.required]]
  })
  secondFormGroup = this.fb.group({
    secondCtrl: ['']
  })
  thirdFormGroup = this.fb.group({
    thirdCtrl: ['']
  })
  fourthFormGroup = this.fb.group({
    fourthCtrl: ['']
  })
  fifthFormGroup = this.fb.group({
    fifthCtrl: ['']
  })
  sixthFormGroup = this.fb.group({
    sixthCtrl: ['']
  })
  seventhFormGroup = this.fb.group({
    seventhCtrl: ['']
  })
  nueva = this.fb.group({
    TituloCorrectivo: ['', Validators.required],
    DescripcionCorrectivo: ['', Validators.required],
    PrioridadId: ['', Validators.required]
  })

  stepperOrientation!: Observable<StepperOrientation>

  
  plantas: Planta[] = [];
  areas: Area[] = [];
  zonas: Zona[] = [];
  secciones: Seccion[]= [];
  codigos: Codigo [] = [];
  grupos: Grupo[] = [];
  equipos: Equipo [] = [];
  prioridades: Prioridad[] = []
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private plantasService:PlantasService,
    private areaService: AreasService,
    private zonaService: ZonasService,
    private seccionService: SeccionesService,
    private codigoService: CodigosService,
    private grupoService:GruposService,
    private equipoService: EquiposService,
    private ordenService: OrdenDeTrabajoService,
    private prioridadService: PrioridadService
  ) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
    .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
   }

  ngOnInit(): void {
    this.getPlantas();
    this.getPrioridades();
  }

  //Planta; obtiene las plantas
  getPlantas() {
    this.plantasService.getPlantas().subscribe(
      res => {
        this.plantas = res;
      },
      err => {
        console.log(err)
        this.snackbar.open(err.error.message, "Cerrar", { duration: 2000, horizontalPosition:'center', verticalPosition:'top' })
      }
    );
  }
//Cada vez que se cambia la opción seleccionada traerá las areas de esa planta
  onChangePlanta(e:any){
    this.ordenCorrectiva.Planta = e.PlantaId
    this.getAreas(e)
  }
  //Area; obtendrá las areas de una planta pasada por parámetro
  getAreas(planta: Planta) {
    this.areaService.getAreas(planta.PlantaId).subscribe(
      res => {
        this.areas = res;
      },
      err => {
        console.log(err)
        this.areas.splice(0, this.areas.length)
        this.snackbar.open(err.error.message, "Cerrar", { duration: 2000, horizontalPosition:'center', verticalPosition:'top' })
      }
    );
  }
  //Cada vez que se cambia la opción seleccionada en el desplegable de las areas traera las zonas de ese área
  onChangeArea(e:any){
    this.ordenCorrectiva.Area = e.AreaId
    this.getZonas(e)
    
  }

  //Zona; obtiene las zonas de una determinada área
  getZonas(area: Area) {
    this.zonaService.getZonasDeArea(area.AreaId).subscribe(
      res => {
        this.zonas = res;
      },
      err => {
        console.log(err)
        this.codigos.splice(0, this.codigos.length)
        this.snackbar.open(err.error.message, "Cerrar", { duration: 2000, horizontalPosition:'center', verticalPosition:'top' })
      }
    );
  }
//Cada vez que se cambia la selección en el desplegable traerá las secciones de la zona seleccionada
  onChangeZona(e:any){
    this.ordenCorrectiva.Zona = e.ZonaId
    this.getSecciones(e)
  }

  //Seccion; obtiene las secciones de una determinada zona pasda por parámetro
  getSecciones(zona: Zona) {
    this.seccionService.getSeccionesDeZona(zona.ZonaId).subscribe(
      res => {
        this.secciones = res;
      },
      err => {
        console.log(err)
        this.codigos.splice(0, this.codigos.length)
        this.snackbar.open(err.error.message, "Cerrar", { duration: 2000, horizontalPosition:'center', verticalPosition:'top' })
      }
    );
  }

  //Cada vez que se cambia la opción seleccionada en el desplegable traera los códigos de esa sección
  onChangeSeccion(e:any){
    this.ordenCorrectiva.Seccion = e.SeccionId
    this.getCodigos(e)
  }

  //Codigo; obtendrá los códigos de una sección pasada por parámetro
  getCodigos(seccion: Seccion) {
    this.codigoService.getCodigoDeSeccion(seccion.SeccionId).subscribe(
      res => {
        this.codigos = res;
      },
      err => {
        console.log(err)
        this.codigos.splice(0, this.codigos.length)
        this.snackbar.open(err.error.message, "Cerrar", { duration: 2000, horizontalPosition:'center', verticalPosition:'top' })
      }
    );
  }
  //Cada vez que se cambia la opción seleccionada traerá los grupos con ese código
  onChangeCodigo(e:any){
    this.ordenCorrectiva.Codigo = e.CodigoId
    this.getGrupos(e)
  }


  //Grupo obtiene los grupos de un código pasado por parámetro
  getGrupos(codigo: Codigo) {
    this.grupoService.getGrupos(codigo.CodigoId).subscribe(
      res => {
        this.grupos = res;
      },
      err => {
        console.log(err)
        this.grupos.splice(0, this.grupos.length)
        this.snackbar.open(err.error.message, "Cerrar", { duration: 2000, horizontalPosition:'center', verticalPosition:'top' })
      }
    );
  }

  //Cada vez que cambia la opción seleccionada en el desplegable trae los equipos de ese grupo seleccionado
  onChangeGrupo(e:any){
    this.ordenCorrectiva.Grupo = e.GrupoId
    this.getEquipos(e)
  }

  //Equipo obtienelos equipos de un grupo pasado por parámetro
  getEquipos(grupo: Grupo) {
    this.equipoService.getEquipos(grupo.GrupoId).subscribe(
      res => {
        this.equipos = res;
      },
      err => {
        console.log(err)
        this.equipos.splice(0, this.equipos.length)
        this.snackbar.open(err.error.message, "Cerrar", { duration: 2000, horizontalPosition:'center', verticalPosition:'top'})
      }
    );
  }

  //Cada vez que cambia la opción seleccionada en el desplegable de los equipos asignará al objeto ordenCorrectiva el id del equipo
  onChangeEquipo(e:any){
    this.ordenCorrectiva.Equipo = e.EquipoId
  }

  //ResetForms; reseta los forms
  resetForm(form: FormGroup) {
    form.reset();
  }

  //Prioridades
  getPrioridades(){
    this.prioridadService.getPrioridades().subscribe(
      res => this.prioridades = res
    )
  }

  //CrearOrden, pasará la persona responsable, el titulo del correctivo, la descripción y la prioridad
  crearOrden() {
    this.ordenCorrectiva.PersonaResponsable = localStorage.getItem('trabajadorMantenimiento')!
    this.ordenCorrectiva.TituloCorrectivo = this.nueva.controls.TituloCorrectivo.value
    this.ordenCorrectiva.DescripcionCorrectivo = this.nueva.controls.DescripcionCorrectivo.value
    this.ordenCorrectiva.PrioridadId = this.nueva.controls.PrioridadId.value
    this.ordenService.crearCorrectivo(this.ordenCorrectiva).subscribe(
      res => { 
        this.snackbar.open("Correctivo creado correctamente", "Cerrar", { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center' }) 
        this.firstFormGroup.reset();
        this.secondFormGroup.reset();
        this.thirdFormGroup.reset();
        this.fourthFormGroup.reset();
        this.fifthFormGroup.reset();
        this.sixthFormGroup.reset();
        this.seventhFormGroup.reset();
        this.nueva.reset();
      }
      , error => console.error(error)
    )
  }

}
