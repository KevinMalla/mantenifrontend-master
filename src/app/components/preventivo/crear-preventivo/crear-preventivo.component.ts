import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PreventivoService } from 'src/app/services/preventivo/preventivo.service';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { PlantasService } from 'src/app/services/ubicacion-tecnica/planta/plantas.service';
import { AreasService } from 'src/app/services/ubicacion-tecnica/area/areas.service';
import { ZonasService } from 'src/app/services/ubicacion-tecnica/zona/zonas.service';
import { SeccionesService } from 'src/app/services/ubicacion-tecnica/seccion/secciones.service';
import { CodigosService } from 'src/app/services/ubicacion-tecnica/codigo/codigos.service';
import { GruposService } from 'src/app/services/ubicacion-tecnica/grupo/grupos.service';
import { EquiposService } from 'src/app/services/ubicacion-tecnica/equipo/equipos.service';
import { Ubicacion } from 'src/app/models/ubicacion-tecnica/Ubicacion';
import { Planta } from 'src/app/models/ubicacion-tecnica/Planta';
import { Area } from 'src/app/models/ubicacion-tecnica/Area';
import { Zona } from 'src/app/models/ubicacion-tecnica/Zona';
import { Seccion } from 'src/app/models/ubicacion-tecnica/Seccion';
import { Codigo } from 'src/app/models/ubicacion-tecnica/Codigo';
import { Grupo } from 'src/app/models/ubicacion-tecnica/Grupo';
import { Equipo } from 'src/app/models/ubicacion-tecnica/Equipo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Tarea } from 'src/app/models/Tarea/Tarea';
import { Preventivo } from 'src/app/models/Preventivo/Preventivo';
import { TareasService } from 'src/app/services/tareas/tareas.service';
import { UTPreventivoService } from 'src/app/services/UT_Preventivo/ut-preventivo.service';
import { formatDate } from '@angular/common';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { Trabajador } from 'src/app/models/Operario/Trabajador';
import { OperarioService } from 'src/app/services/operario/operario.service';

@Component({
  selector: 'app-crear-preventivo',
  templateUrl: './crear-preventivo.component.html',
  styleUrls: ['./crear-preventivo.component.css']
})
export class CrearPreventivoComponent implements OnInit {

  nuevoPreventivo: boolean = true;
  periodicidades: any[] = []
  preventivos: Preventivo[] = [];
  tareasPreventivo: Tarea[] = []
  operarios: Trabajador[] = []

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
  seleccionPreventivo = this.fb.group({
    preventivo: ['', Validators.required],
    fecha: ['']
  })
  preventivoForm = this.fb.group({
    nombre: ['', Validators.required],
    periodicidad: ['', Validators.required],
    fecha: [''],
    OperarioId: 0,
  })
  stepperOrientation!: Observable<StepperOrientation>

  ubicacionTecnica: Ubicacion = {
    PlantaId: "",
    AreaId: "",
    ZonaId: "",
    SeccionId: "",
    CodigoId: "",
    GrupoId: "",
    EquipoId: ""
  }

  plantas: Planta[] = [];
  areas: Area[] = [];
  zonas: Zona[] = [];
  secciones: Seccion[] = [];
  codigos: Codigo[] = [];
  grupos: Grupo[] = [];
  equipos: Equipo[] = [];

  tarea: Tarea = {
    TareaId: 0,
    Descripcion: ''
  }

  prev: Preventivo = {
    PreventivoId: 0,
    Descripcion: '',
    OperarioId:0
  }

  tareasI: string[] = []
  preventivo!: Preventivo[];

  form = this.fb.group({
    tareas: this.fb.array([]),
  });

  constructor(
    private dialog: MatDialog,
    private preventivoService: PreventivoService,
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private snackbar: MatSnackBar,
    private plantasService: PlantasService,
    private areaService: AreasService,
    private zonaService: ZonasService,
    private seccionService: SeccionesService,
    private codigoService: CodigosService,
    private grupoService: GruposService,
    private equipoService: EquiposService,
    private tareaService: TareasService,
    private UTPreventivo: UTPreventivoService,
    private periodiciadService: PeriodicidadService,
    private operarioService: OperarioService
  ) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit(): void {
    this.getPlantas();
    this.selectPeriodicidades();
    this.addTarea();
    this.getPreventivos();
    this.getTrabajadores();
  }

  //Carga los trabajdores en el desplegable
  getTrabajadores() {
    this.operarioService.getUsuario().subscribe(
      res => {
        this.operarios = res
      }
    )
  }

  //Carga las periodicidades
  selectPeriodicidades() {
    this.periodiciadService.getPeriodicidad().subscribe(
      res => this.periodicidades = res
      , err => console.log(err)
    )
  }

  get firstCtrl(): any {
    return this.firstFormGroup.get('firstCtrl')?.value
  }
  get secondCtrl(): any {
    return this.secondFormGroup.get('secondCtrl')?.value
  }
  get thirdCtrl(): any {
    return this.thirdFormGroup.get('thirdCtrl')?.value
  }
  get fourthCtrl(): any {
    return this.fourthFormGroup.get('fourthCtrl')?.value
  }
  get fifthCtrl(): any {
    return this.fifthFormGroup.get('fifthCtrl')?.value
  }
  get sixthCtrl(): any {
    return this.sixthFormGroup.get('sixthCtrl')?.value
  }
  get seventhCtrl(): any {
    return this.seventhFormGroup.get('seventhCtrl')?.value
  }

  //Cada vez que se selecciona una opción de los desplegables se inserta el id en el objeto UbicacionTecnica
  onChange(ubicacion: string, e: any) {
    if (e != undefined) {
      switch (ubicacion) {
        case 'Planta': {
          this.ubicacionTecnica.PlantaId = e.PlantaId
          this.getAreas(e);
          break;
        }
        case 'Area': {
          this.ubicacionTecnica.AreaId = e.AreaId
          this.getZonas(e);
          break;
        }
        case 'Zona': {
          this.ubicacionTecnica.ZonaId = e.ZonaId
          this.getSecciones(e);
          break;
        }
        case 'Seccion': {
          this.ubicacionTecnica.SeccionId = e.SeccionId
          this.getCodigos(e);
          break;
        }
        case 'Codigo': {
          this.ubicacionTecnica.CodigoId = e.CodigoId
          this.getGrupos(e);
          break;
        }
        case 'Grupo': {
          this.ubicacionTecnica.GrupoId = e.GrupoId
          this.getEquipos(e);
          break;
        }
        case 'Equipo': {
          this.ubicacionTecnica.EquipoId = e.EquipoId
          break;
        }
      }
    }
  }

  /*Cuando pulsa botón anterior borra el form y borra la propiedad de la ubicación*/
  resetForm(form: FormGroup) {
    form.reset();
  }

  //Get preventivos  para cargar el desplegable cuando se quiere seleccionar un preventivo ya creado 
  getPreventivos() {
    this.preventivoService.getPreventivos().subscribe(
      res => {
        this.preventivos = res;
        this.preventivos.splice(0, 1)
      },
      err => console.error(err))
  }

  //Cada vez que se selecciona el preventivo ya creado se cargarán las tareas para visualizarlas
  onChangePreventivo(newValue: number) {
    this.tareaService.getTareasDePreventivo(newValue).subscribe(
      res => {
        this.tareasPreventivo = res

      },
      err => {
        console.error(err.error.message)
        this.snackbar.open(err.error.message, "Cerrar", { horizontalPosition: 'center', verticalPosition: 'top', duration: 2000 })
      }
    )
  }

  getPlantas() {
    this.plantasService.getPlantas().subscribe(
      res => {
        this.plantas = res;
      },
      err => {
        console.log(err)
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      }
    );
  }
  getAreas(planta: Planta) {
    this.areaService.getAreas(planta.PlantaId).subscribe(
      res => {
        this.areas = res;
      },
      err => {
        console.log(err)
        this.areas.splice(0, this.areas.length)
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      }
    );
  }
  getZonas(area: Area) {
    this.zonaService.getZonasDeArea(area.AreaId).subscribe(
      res => {
        this.zonas = res;
      },
      err => {
        console.log(err)
        this.zonas.splice(0, this.zonas.length)
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      }
    );
  }
  getSecciones(zona: Zona) {
    this.seccionService.getSeccionesDeZona(zona.ZonaId).subscribe(
      res => {
        this.secciones = res;
      },
      err => {
        console.log(err)
        this.secciones.splice(0, this.secciones.length)
        this.snackbar.open(err.error.message, "", { duration: 2000 })

      }
    );
  }
  getCodigos(seccion: Seccion) {
    this.codigoService.getCodigoDeSeccion(seccion.SeccionId).subscribe(
      res => {
        this.codigos = res;
      },
      err => {
        console.log(err)
        this.grupos.splice(0, this.codigos.length)
        this.snackbar.open(err.error.message, "", { duration: 2000 })

      }
    );
  }
  getGrupos(codigo: Codigo) {
    this.grupoService.getGrupos(codigo.CodigoId).subscribe(
      res => {
        this.grupos = res;
      },
      err => {
        console.log(err)
        this.snackbar.open(err.error.message, "Cerrar", { horizontalPosition: 'center', verticalPosition: 'top', duration: 2000 })
        this.grupos.splice(0, this.grupos.length)
      }
    );
  }
  getEquipos(grupo: Grupo) {
    this.equipoService.getEquipos(grupo.GrupoId).subscribe(
      res => {
        this.equipos = res;
      },
      err => {
        console.log(err)
        this.equipos.splice(0, this.equipos.length)
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      }
    );
  }
  
  get tareas() {
    return this.form.controls["tareas"] as FormArray;
  }

  //Añade un input al form
  addTarea(): void {
    const tareaForm = this.fb.group({
      desc: ['', Validators.required]
    });
    this.tareas.push(tareaForm)
  }
  //Quita ek input del form
  deleteTarea(tareaindex: number): void {
    this.tareas.removeAt(tareaindex)
  }

  /** Crea el preventivo*/
  async crearPreventivo() {
    if (this.nuevoPreventivo) {
      /** Insertar preventivo en tabla preventivo */
      this.prev = this.preventivoForm.value
      await this.preventivoService.addPreventivo(this.prev).toPromise();
      /** Insertar tarea en tabla tareas y obtener su id, inmediatamente asociarla al preventivo */
      let lastId = await this.preventivoService.getLastPreventivo().toPromise();
      for (let i = 0; i < this.tareas.length; i++) {
        let tarea: string[] = [];
        let lastIdTarea: number[] = [];
        tarea.push(this.tareas.value[i]['desc'])
        await this.tareaService.insertTarea(tarea).toPromise();
        lastIdTarea.push(await this.tareaService.getLastTarea().toPromise());
        this.tareaService.insertTareaPrev(lastId, lastIdTarea).subscribe();
      }
      let datebd = ''
      //Cuando la fecha se ha elegido se formatea y se envia junto con la ubicacion tecnica el id del preventivo y la fecha
      if (this.preventivoForm.value.fecha != '') datebd = formatDate(this.preventivoForm.value.fecha, 'YYYY-MM-dd', 'en');
      this.UTPreventivo.addUTPreventivo(lastId, this.ubicacionTecnica, datebd).subscribe(
        (res: any) => {
          this.snackbar.open(res.message, "Cerrar", {
            verticalPosition: 'top', horizontalPosition: 'center', duration: 2000
          })
        },
        err => console.log(err)
      )
    } else if (this.nuevoPreventivo == false) {
      let datebd = ''
      if (this.seleccionPreventivo.value.fecha != '') datebd = formatDate(this.preventivoForm.value.fecha, 'YYYY-MM-dd', 'en');
      this.UTPreventivo.addUTPreventivo(this.seleccionPreventivo.controls.preventivo.value, this.ubicacionTecnica, datebd).subscribe(
        (res: any) => {
          this.snackbar.open(res.message, "Cerrar", { verticalPosition: 'top', horizontalPosition: 'center', duration: 2000 })
        },
        err => console.log(err)
      )
    }

    //Una vez creado se resetean los forms
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    this.fourthFormGroup.reset();
    this.fifthFormGroup.reset();
    this.sixthFormGroup.reset();
    this.seventhFormGroup.reset();
    this.seleccionPreventivo.reset();
    this.preventivoForm.reset();
    this.form.reset();
  }
}