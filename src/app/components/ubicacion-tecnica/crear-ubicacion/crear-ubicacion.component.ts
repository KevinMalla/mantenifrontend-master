import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditarUbicacionComponent } from '../editar-ubicacion/editar-ubicacion.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-crear-ubicacion',
  templateUrl: './crear-ubicacion.component.html',
  styleUrls: ['./crear-ubicacion.component.css']
})
export class CrearUbicacionComponent implements OnInit {

  firstFormGroup = this.fb.group({
    firstCtrl: [''],
  })
  PlantaFormGroup = this.fb.group({
    Denominacion: [''],
    Descripcion: ['']
  })
  secondFormGroup = this.fb.group({
    secondCtrl: [''],
    secondCtrl1: [''],
  })
  AreaFormGroup = this.fb.group({
    Denominacion: [''],
    Descripcion: ['']
  })
  thirdFormGroup = this.fb.group({
    thirdCtrl: [''],
    thirdCtrl1: ['']
  })
  ZonaFormGroup = this.fb.group({
    Denominacion: [''],
    Descripcion: ['']
  })
  fourthFormGroup = this.fb.group({
    fourthCtrl: [''],
    fourthCtrl1: ['']
  })
  SeccionFormGroup = this.fb.group({
    Denominacion: [''],
    Descripcion: ['']
  })
  fifthFormGroup = this.fb.group({
    fifthCtrl: [''],
    fifthCtrl1: ['']
  })
  CodigoFormGroup = this.fb.group({
    Denominacion: [''],
    Descripcion: ['']
  })
  sixthFormGroup = this.fb.group({
    sixthCtrl: [''],
    sixthCtrl1: ['']
  })
  GrupoFormGroup = this.fb.group({
    Denominacion: [''],
    Descripcion: ['']
  })
  seventhFormGroup = this.fb.group({
    seventhCtrl: [''],
    seventhCtrl1: ['']
  })
  EquipoFormGroup = this.fb.group({
    Denominacion: [''],
  })

  nuevaPlanta:boolean=false;
  nuevaArea:boolean=false;
  nuevaZona:boolean=false;
  nuevaSeccion:boolean=false;
  nuevaCodigo:boolean=false;
  nuevoGrupo:boolean=false;
  nuevoEquipo:boolean=false;

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
  displayedColumns: string[] = ['Planta', 'Area', 'Zona', 'Seccion', 'Codigo', 'Grupo', 'Equipo', 'Acciones']
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
    private breakpointObserver: BreakpointObserver,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));
  }
  ngOnInit(): void {
    this.getPlantas()
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
  eliminarPlanta(){
    if (confirm("¿Desea eliminar esta planta?")) {
    this.plantasService.deletePlanta(this.firstFormGroup.controls.firstCtrl.value.PlantaId).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
        this.getPlantas();
        this.firstFormGroup.reset();
      },
      err => {
        console.log(err)
        this.snackbar.open(err.error.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
      })
    }
  }
  crearPlanta(){
    let planta:Planta = this.PlantaFormGroup.value
    this.plantasService.createPlanta(planta).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "", { duration: 2000 })
        this.getPlantas();
        this.firstFormGroup.reset();
        this.PlantaFormGroup.reset();
      },
      err => {
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      })
    this.nuevaPlanta = false;
  }
  onChangePlanta(e:any){
    this.ubicacionTecnica.PlantaId = e.PlantaId
    this.getAreas(e)
  }
  editarPlanta(planta:Planta){
    const dialogo1 = this.dialog.open(EditarUbicacionComponent, {
      width: 'auto',
      height: 'auto',
      data: {Denominacion: planta.Denominacion, Descripcion: planta.Descripcion, Id: planta.PlantaId}
    })
    dialogo1.afterClosed().subscribe(datos=>{
     if (datos!=undefined){
        this.plantasService.updatePlanta(planta.PlantaId, datos).subscribe(
          (res: any) => {
            this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
            this.getPlantas();
            this.firstFormGroup.reset()
          },
          err => console.error(err)
        )
     }
    })
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
  eliminarArea(){
    if (confirm("¿Desea eliminar esta área?")) {
    this.areaService.deleteArea(this.secondFormGroup.controls.secondCtrl.value.AreaId).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
        this.getAreas(this.firstFormGroup.controls.firstCtrl.value)
        this.secondFormGroup.reset();
      },
      err => {
        console.log(err)
        this.snackbar.open(err.error.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
      })
    }
  }
  crearArea(){
    let area:Area = this.AreaFormGroup.value
    area.PlantaId = this.firstFormGroup.controls.firstCtrl.value.PlantaId
    this.areaService.createArea(area).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "", { duration: 2000 })
        this.getAreas(this.firstFormGroup.controls.firstCtrl.value)
        this.AreaFormGroup.reset();
        this.secondFormGroup.reset();
      },
      err => {
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      })
      this.nuevaArea = false;
  }
  onChangeArea(e:any){
    this.ubicacionTecnica.AreaId = e.AreaId
    this.getZonas(e)
    
  }
  editarArea(area:Area){
    const dialogo1 = this.dialog.open(EditarUbicacionComponent, {
      width: 'auto',
      height: 'auto',
      data: {Denominacion: area.Denominacion, Descripcion: area.Descripcion, Id: area.AreaId}
    })
    dialogo1.afterClosed().subscribe(datos=>{
      if (datos!=undefined){
        this.areaService.updateArea(area.AreaId, datos).subscribe(
          (res: any) => {
            this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
            this.getAreas(this.firstFormGroup.controls.firstCtrl.value);
            this.secondFormGroup.reset()
          },
          err => console.error(err)
        )
      }
    })
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
  eliminarZona(){
    if (confirm("¿Desea eliminar esta zona?")) {
      this.zonaService.deleteZona(this.thirdFormGroup.controls.thirdCtrl.value.ZonaId).subscribe(
        (res: any) => {
          this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
          this.getZonas(this.secondFormGroup.controls.secondCtrl.value)
          this.thirdFormGroup.reset();
        },
        err => {
          console.log(err)
          this.snackbar.open(err.error.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
        })
    }
  }
  crearZona(){
    let zona:Zona = this.ZonaFormGroup.value
    zona.AreaId = this.secondFormGroup.controls.secondCtrl.value.AreaId
   
    this.zonaService.createZona(zona).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "", { duration: 2000 })
        this.getZonas(this.secondFormGroup.controls.secondCtrl.value)
        this.ZonaFormGroup.reset();
        this.thirdFormGroup.reset();
      },
      err => {
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      })
      this.nuevaZona = false;
  }
  onChangeZona(e:any){
    this.ubicacionTecnica.ZonaId = e.ZonaId
    this.getSecciones(e)
  }
  editarZona(zona:Zona){
    const dialogo1 = this.dialog.open(EditarUbicacionComponent, {
      width: 'auto',
      height: 'auto',
      data: {Denominacion: zona.Denominacion, Descripcion: zona.Descripcion, Id: zona.ZonaId}
    })
    dialogo1.afterClosed().subscribe(datos=>{
      if (datos!=undefined){
        this.zonaService.updateZona(zona.ZonaId, datos).subscribe(
          (res: any) => {
            this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
            this.getZonas(this.secondFormGroup.controls.secondCtrl.value);
            this.thirdFormGroup.reset();
          },
          err => console.error(err)
        )
      }
    })
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
  eliminarSeccion(){
    if (confirm("¿Desea eliminar esta área?")) {
      this.seccionService.deleteSeccion(this.fourthFormGroup.controls.fourthCtrl.value.SeccionId).subscribe(
        (res: any) => {
          this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
          this.getSecciones(this.thirdFormGroup.controls.thirdCtrl.value)
          this.fourthFormGroup.reset();
        },
        err => {
          console.log(err)
          this.snackbar.open(err.error.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
        })
    }

  }
  crearSeccion(){
    let seccion:Seccion = this.SeccionFormGroup.value
    seccion.ZonaId = this.thirdFormGroup.controls.thirdCtrl.value.ZonaId
    this.seccionService.createSeccion(seccion).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "", { duration: 2000 })
        this.getSecciones(this.thirdFormGroup.controls.thirdCtrl.value)
        this.SeccionFormGroup.reset();
        this.fourthFormGroup.reset();
      },
      err => {
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      })
      this.nuevaSeccion = false;
  }
  onChangeSeccion(e:any){
    this.ubicacionTecnica.SeccionId = e.SeccionId
    this.getCodigos(e)
  }
  editarSeccion(seccion:Seccion){
    const dialogo1 = this.dialog.open(EditarUbicacionComponent, {
      width: 'auto',
      height: 'auto',
      data: {Denominacion: seccion.Denominacion, Descripcion: seccion.Descripcion, Id: seccion.SeccionId}
    })
    dialogo1.afterClosed().subscribe(datos=>{
      console.log(datos)
      if (datos!=undefined){
        this.seccionService.updateSeccion(seccion.SeccionId, datos).subscribe(
          (res: any) => {
            this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
            this.getSecciones(this.thirdFormGroup.controls.thirdCtrl.value);
            this.fourthFormGroup.reset();
          },
          err => console.error(err)
        )
      }
    })
  }
  getCodigos(seccion: Seccion) {
    this.codigoService.getCodigoDeSeccion(seccion.SeccionId).subscribe(
      res => {
        this.codigos = res;
      },
      err => {
        console.log(err)
        this.codigos.splice(0, this.codigos.length)
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      }
    );
  }
  eliminarCodigo(){
    if (confirm("¿Desea eliminar esta área?")) {
    this.codigoService.deleteCodigo(this.fifthFormGroup.controls.fifthCtrl.value.CodigoId).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})               
        this.getCodigos(this.fourthFormGroup.controls.fourthCtrl.value)
        this.fifthFormGroup.reset();
      },
      err => {
        console.log(err)
        this.snackbar.open(err.error.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
      })
    }
  }
  crearCodigo(){
    let codigo:Codigo = this.CodigoFormGroup.value
    codigo.SeccionId = this.fourthFormGroup.controls.fourthCtrl.value.SeccionId
    this.codigoService.createCodigo(codigo).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "", { duration: 2000 })
        this.getCodigos(this.fourthFormGroup.controls.fourthCtrl.value)
        this.CodigoFormGroup.reset(),
        this.fifthFormGroup.reset();
      },
      err => {
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      })
    this.nuevaCodigo = false;

  }
  onChangeCodigo(e:any){
    this.ubicacionTecnica.CodigoId = e.CodigoId
    this.getGrupos(e)
  }
  editarCodigo(codigo:Codigo){
    const dialogo1 = this.dialog.open(EditarUbicacionComponent, {
      width: 'auto',
      height: 'auto',
      data: {Denominacion: codigo.Denominacion, Descripcion: codigo.Descripcion, Id: codigo.CodigoId}
    })
    dialogo1.afterClosed().subscribe(datos=>{
      if (datos!=undefined){
        this.codigoService.updateCodigo(codigo.CodigoId, datos).subscribe(
          (res: any) => {
            this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
            this.getCodigos(this.fourthFormGroup.controls.fourthCtrl.value);
            this.fifthFormGroup.reset();
          },
          err => console.error(err)
        )
      }
    })
  }
  getGrupos(codigo: Codigo) {
    this.grupoService.getGrupos(codigo.CodigoId).subscribe(
      res => {
        this.grupos = res;
      },
      err => {
        console.log(err)
        this.grupos.splice(0, this.grupos.length)
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      }
    );
  }
  eliminarGrupo(){
    if (confirm("¿Desea eliminar esta área?")) {
    this.grupoService.deleteGrupo(this.sixthFormGroup.controls.sixthCtrl.value.GrupoId).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
        this.getGrupos(this.sixthFormGroup.controls.sixthCtrl.value)
        this.sixthFormGroup.reset();
      },
      err => {
        console.log(err)
        this.snackbar.open(err.error.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
      })
    }
  }
  crearGrupo(){
    let grupo:Grupo = this.GrupoFormGroup.value
    grupo.CodigoId = this.fifthFormGroup.controls.fifthCtrl.value.CodigoId
    this.grupoService.createGrupo(grupo).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "", { duration: 2000 })
        this.getGrupos(this.fifthFormGroup.controls.fifthCtrl.value)
        this.sixthFormGroup.reset();
        this.GrupoFormGroup.reset();
      },
      err => {
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      })
      this.nuevoGrupo = false;
  }
  onChangeGrupo(e:any){
    this.ubicacionTecnica.GrupoId = e.GrupoId
    this.getEquipos(e)
  }
  editarGrupo(grupo:Grupo){
    const dialogo1 = this.dialog.open(EditarUbicacionComponent, {
      width: 'auto',
      height: 'auto',
      data: {Denominacion: grupo.Denominacion, Descripcion: grupo.Descripcion, Id: grupo.GrupoId}
    })
    dialogo1.afterClosed().subscribe(datos=>{
      if (datos!=undefined){
        this.grupoService.updateGrupo(grupo.GrupoId, datos).subscribe(
          (res: any) => {
            this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
            this.getGrupos(this.fifthFormGroup.controls.fifthCtrl.value);
            this.sixthFormGroup.reset();
          },
          err => console.error(err)
        )
      }
    })
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
  eliminarEquipo(){
    if (confirm("¿Desea eliminar esta área?")) {
    this.equipoService.deleteEquipo(this.seventhFormGroup.controls.seventhCtrl.value.EquipoId).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
        this.getEquipos(this.sixthFormGroup.controls.sixthCtrl.value)
        this.seventhFormGroup.reset();
      },
      err => {
        console.log(err)
        this.snackbar.open(err.error.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
      })
    }
  }
  crearEquipo(){
    let equipo:Equipo = this.EquipoFormGroup.value
    equipo.GrupoId = this.sixthFormGroup.controls.sixthCtrl.value.GrupoId
    this.equipoService.createEquipo(equipo).subscribe(
      (res: any) => {
        this.snackbar.open(res.message, "", { duration: 2000 })
        this.getEquipos(this.sixthFormGroup.controls.sixthCtrl.value)
        this.seventhFormGroup.reset();
        this.EquipoFormGroup.reset();
      },
      err => {
        this.snackbar.open(err.error.message, "", { duration: 2000 })
      })
      this.nuevoEquipo = false;
  }
  onChangeEquipo(e:any){
    this.ubicacionTecnica.EquipoId = e.EquipoId
  }
  editarEquipo(equipo:Equipo){
    const dialogo1 = this.dialog.open(EditarUbicacionComponent, {
      width: 'auto',
      height: 'auto',
      data: {Denominacion: equipo.Denominacion, Id: equipo.EquipoId}
    })
    dialogo1.afterClosed().subscribe(datos=>{
      if (datos!=undefined){
        this.equipoService.updateEquipo(equipo.EquipoId, datos).subscribe(
          (res: any) => {
            this.snackbar.open(res.message, "Cerrar", {verticalPosition: 'top', horizontalPosition:'center', duration:2000})
            this.getEquipos(this.sixthFormGroup.controls.sixthCtrl.value);
            this.seventhFormGroup.reset();
          },
          err => console.error(err)
        )
      }
    })
  }
}