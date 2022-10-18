import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Planta } from 'src/app/models/ubicacion-tecnica/Planta';
import { Area } from 'src/app/models/ubicacion-tecnica/Area';
import { Zona } from 'src/app/models/ubicacion-tecnica/Zona';
import { Seccion } from 'src/app/models/ubicacion-tecnica/Seccion';
import { Codigo } from 'src/app/models/ubicacion-tecnica/Codigo';
import { Grupo } from 'src/app/models/ubicacion-tecnica/Grupo';
import { Equipo } from 'src/app/models/ubicacion-tecnica/Equipo';
import { Ubicacion } from 'src/app/models/ubicacion-tecnica/Ubicacion';
import { PlantasService } from 'src/app/services/ubicacion-tecnica/planta/plantas.service';
import { AreasService } from 'src/app/services/ubicacion-tecnica/area/areas.service';
import { ZonasService } from 'src/app/services/ubicacion-tecnica/zona/zonas.service';
import { SeccionesService } from 'src/app/services/ubicacion-tecnica/seccion/secciones.service';
import { CodigosService } from 'src/app/services/ubicacion-tecnica/codigo/codigos.service';
import { GruposService } from 'src/app/services/ubicacion-tecnica/grupo/grupos.service';
import { EquiposService } from 'src/app/services/ubicacion-tecnica/equipo/equipos.service';
import { UbicacionService } from 'src/app/services/ubicacion-tecnica/ubicacion/ubicacion.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-seleccionar-ubicacion',
  templateUrl: './seleccionar-ubicacion.component.html',
  styleUrls: ['./seleccionar-ubicacion.component.css']
})
export class SeleccionarUbicacionComponent implements OnInit {

  firstFormGroup = this.fb.group({
    firstCtrl: ['']
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
 
  dataSource = new MatTableDataSource<Ubicacion>();
  searchKey!: string;
  displayedColumns: string[] = ['Planta', 'Area', 'Zona', 'Seccion', 'Codigo', 'Grupo', 'Equipo']
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private plantasService: PlantasService,
    private areaService: AreasService,
    private zonaService: ZonasService,
    private seccionService: SeccionesService,
    private codigoService: CodigosService,
    private grupoService: GruposService,
    private equipoService: EquiposService,
    private ubicacionService: UbicacionService,
    private breakpointObserver: BreakpointObserver,
    private snackbar: MatSnackBar,
    private fb:FormBuilder,
    //private dialogRef: MatDialogRef<SeleccionarUbicacionComponent>
  ) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }

  ngOnInit() {
    this.getPlantas()
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
        this.snackbar.open(err.error.message, "", { duration: 2000 })
        this.grupos.splice(0,this.grupos.length)
      }
    );
  }
  getEquipos(grupo:Grupo) {
    this.equipoService.getEquipos(grupo.GrupoId).subscribe(
      res => {
        this.equipos = res;
      },
      err => {
        console.log(err)
        this.equipos.splice(0,this.equipos.length)
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      }
    );
  }
  /** Obtiene los registros de la base de datos con la ubicación técnica seleccionada*/
  obtenerDatos() {
    this.ubicacionService.getUbicaciones(this.ubicacionTecnica).subscribe(
      res => {

          this.dataSource.data = res;
        },
        err =>{
          console.log(err)
          this.snackbar.open(err.error.message, "", { duration: 2000 })          
        }
    )
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /*Filtros para mat-table */
  applyFilter() {
    this.dataSource.filter = this.searchKey.toLowerCase().trim();
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  /*------------------------*/
}