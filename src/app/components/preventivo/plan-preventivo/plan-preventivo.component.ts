import { Component, OnInit, ViewChild } from '@angular/core';
import { UTPreventivoService } from 'src/app/services/UT_Preventivo/ut-preventivo.service';
import { UTPreventivo } from 'src/app/models/Preventivo/UtPreventivo';
import { PlantasService } from 'src/app/services/ubicacion-tecnica/planta/plantas.service';
import { AreasService } from 'src/app/services/ubicacion-tecnica/area/areas.service';
import { ZonasService } from 'src/app/services/ubicacion-tecnica/zona/zonas.service';
import { SeccionesService } from 'src/app/services/ubicacion-tecnica/seccion/secciones.service';
import { CodigosService } from 'src/app/services/ubicacion-tecnica/codigo/codigos.service';
import { GruposService } from 'src/app/services/ubicacion-tecnica/grupo/grupos.service';
import { EquiposService } from 'src/app/services/ubicacion-tecnica/equipo/equipos.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Ubicacion } from 'src/app/models/ubicacion-tecnica/Ubicacion';
import { Planta } from 'src/app/models/ubicacion-tecnica/Planta';
import { Area } from 'src/app/models/ubicacion-tecnica/Area';
import { Zona } from 'src/app/models/ubicacion-tecnica/Zona';
import { Seccion } from 'src/app/models/ubicacion-tecnica/Seccion';
import { Codigo } from 'src/app/models/ubicacion-tecnica/Codigo';
import { Grupo } from 'src/app/models/ubicacion-tecnica/Grupo';
import { Equipo } from 'src/app/models/ubicacion-tecnica/Equipo';
import { map } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditarFechaComponent } from '../editar-fecha/editar-fecha.component';
import { Preventivo } from 'src/app/models/Preventivo/Preventivo';

@Component({
  selector: 'app-plan-preventivo',
  templateUrl: './plan-preventivo.component.html',
  styleUrls: ['./plan-preventivo.component.css']
})

export class PlanPreventivoComponent implements OnInit {

  //selector
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
  //FIn Selector
  stepperOrientation!: Observable<StepperOrientation> // Permite a mat stepper se resposive

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



  bloqueado:boolean = false;
  semanas!: number;
  semanasAPintar!: number
  semanaActual!: number
  anioBisiesto!: boolean
  utpreventivo!: UTPreventivo[];
  semanasNext: number[][] = [];
  numeroSemana!: number
  dias!: number
  finalAnio!: Date

  constructor(
    private utPreventivoService: UTPreventivoService,
    private plantasService: PlantasService,
    private areaService: AreasService,
    private zonaService: ZonasService,
    private seccionService: SeccionesService,
    private codigoService: CodigosService,
    private grupoService: GruposService,
    private equipoService: EquiposService,
    private breakpointObserver: BreakpointObserver,
    private snackbar: MatSnackBar,
    private fb:FormBuilder,
    private dialog: MatDialog
  ) {
  this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')//acer el mat stepper responsive
  .pipe(map(({ matches }) => matches ? 'horizontal' : 'vertical'));}

  ngOnInit(): void {
    this.getPlantas();
    this.saberSiAnioBisiesto(new Date());
    this.semanaActual = this.obtenerNumeroDeSemana(new Date());
    this.obtenerFinalAnio(new Date());
    this.pintarEncabezados();
  }

  //Se obtienen los preventivos que pertenezcan a la ubicacion tecnica 
  selectPreventivos() {
    this.utPreventivoService.getPreventivo(this.ubicacionTecnica).subscribe(
      res => {
        this.utpreventivo = res
        this.pintarTabla();
      }
      , err =>{
          console.log(err) 
          this.snackbar.open(err.error.message,"Cerrar",{duration:2000})   
          let mytbody = document.getElementsByTagName('tbody')[0]; // Seleccionar tbody en table  
          mytbody.innerHTML = "";

      })
  }

  //Para saber cuantas semanas se deben pintar en el calendario es necesario saber si el año en el que nos encontramos es bisiesto
  saberSiAnioBisiesto(date: Date) {
    let year = date.getFullYear();
    if ((year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0)))
      this.anioBisiesto = true;
    else if (year % 100 != 0)
      this.anioBisiesto = false;

    this.calcularSemanasAPintar();
  }
  //Calcula las semanas
  calcularSemanasAPintar() {
    if (this.anioBisiesto == true) this.semanas = 53
    else this.semanas = 52
    this.semanasAPintar = this.semanas
  }
  //Obtiene el numero de semana de una fecha pasada por parametro
  obtenerNumeroDeSemana(dt: Date) {
    var tdt = new Date(dt.valueOf());
    var dayn = (dt.getDay() + 6) % 7;
    tdt.setDate(tdt.getDate() - dayn + 3);
    var firstThursday = tdt.valueOf();
    tdt.setMonth(0, 1);
    if (tdt.getDay() !== 4) {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - Number(tdt)) / 604800000);
  }
  //Obtiene el final de año
  obtenerFinalAnio(fecha: Date) {
    let date = new Date();
    let year = date.getFullYear();
    if (year % 400 == 0 && year % 4 == 0) {
      this.anioBisiesto = true;
      this.dias = 359
    } else if (year % 100 != 0) {
      this.anioBisiesto = false;
      this.dias = 358
    }
    fecha.setDate(fecha.getDate() + this.dias)
    this.finalAnio = fecha
  }
  pintarEncabezados(){
    let mythead = document.getElementById('thead'); //Thead para encabezados
    let firstRow = document.createElement('tr'); // Primera fila
    //Nombre del activo
    let sitioTituloActivo = document.createElement('th')
    let tituloActivo = document.createTextNode('Nombre del activo')// Palabra preventivo añadida a primera fila y primera columna
    sitioTituloActivo.setAttribute("scope","col")
    sitioTituloActivo.setAttribute("class","bg-dark text-center")
    sitioTituloActivo.setAttribute("style",`color:white; position: sticky;top: 0; left:0;z-index: 1; width:180px;`)
    sitioTituloActivo.appendChild(tituloActivo)
    firstRow.appendChild(sitioTituloActivo)

    //Linea
    let sitioTituloLinea = document.createElement('th')
    let tituloLinea = document.createTextNode('Línea')// Palabra preventivo añadida a primera fila y primera columna
    sitioTituloLinea.setAttribute("scope","col")
    sitioTituloLinea.setAttribute("class","bg-dark text-center border-start border-end")
    sitioTituloLinea.setAttribute("style",`color:white; position: sticky;top: 0; left:0;z-index: 1; width:250px;`)
    sitioTituloLinea.appendChild(tituloLinea)
    firstRow.appendChild(sitioTituloLinea)

    //Encabezado Titulo: Codigo del activo
    let sitioTitulo = document.createElement('th')
    let titulo = document.createTextNode('Código del activo')// Palabra preventivo añadida a primera fila y primera columna
    sitioTitulo.setAttribute("scope","col")
    sitioTitulo.setAttribute("class","bg-dark text-center")
    sitioTitulo.setAttribute("style",`color:white; position: sticky;top: 0; left:0;z-index: 1; width:450px;`)
    sitioTitulo.appendChild(titulo)
    firstRow.appendChild(sitioTitulo)
    //Encabezados Número de semana
    for (let i = 0; i < this.semanasAPintar; i++) {
      this.numeroSemana = this.semanaActual + i
      if (this.numeroSemana > this.semanas) this.numeroSemana -= this.semanas
      let mycell = document.createElement('th')
      let mytext = document.createTextNode(this.numeroSemana.toString())
      mycell.setAttribute("scope","col")
      mycell.setAttribute("class","text-center border-start border-end")
      mycell.setAttribute("style","background-color:#e6e6e6; width:45px;")
      mycell.appendChild(mytext)
      firstRow.appendChild(mycell)
    }
    mythead!.appendChild(firstRow);
    //Fin introducción encabezados
  }
  async pintarTabla() {
    //bloquear boton 'Ver'
    this.bloqueado = true

     //Pintar preventivo fila por fila
    let mytbody = document.getElementById('tbody'); // Seleccionar tbody en table,el cual ya esta creado 
    
    //Vaciar tbody si estuviese lleno
    if(mytbody!.getElementsByTagName('tr').length > 0){
      mytbody!.innerHTML = "";
    }
    //Recorre los preventivos obtenidos de la ubicacion tecnica
    for (let j = 0; j < this.utpreventivo.length; j++) {
      let mycurrent_row = document.createElement('tr');//Creamos un tr en el que meteremos los datos de cada preventivo
      let semanasAPintar = [];//Intruciremos el  número de semanas a pintar, ya sea en rojo o en verde
      let rojo: boolean = false; // Definirá si el recuadro de la tabla se pintará en rojo o en caso contrario en verde
      let periodo = this.utpreventivo[j].Dias;  //Es la perioficidad en días con el que podremos operar
        
      if(this.utpreventivo[j].FechaInicio != 'SIN FECHA'){ //Si es diferente de sin fecha, es decir que tiene fecha

        let respuesta = await this.utPreventivoService.comprobarSiHayFechaFin(this.utpreventivo[j].utprevid!).toPromise() //Comprueba enviando a la API el id del preventivo para saber si tiene orden finalizada y si la tiene traer la fecha
        let fechaInicial: Date;//Variable que usaremos en el bloque
        let fechaHoy = new Date();//Variable que usaremos en el bloque
 
        if (respuesta.Estado == 'true')/**Si tiene fecha última OT validada*/ {
          fechaInicial = new Date(respuesta.FechaValidado)//La fecha inicial será la de la OT
          fechaInicial.setDate(fechaInicial.getDate() + periodo!)//Se suma el periodo a esta fecha de la OT
  
          if (fechaHoy.valueOf() < fechaInicial.valueOf()) {// Si la fecha de hoy es menor a la fecha en la que debería realizarse el siguiente preventivo
            rojo = false;//Se pintará en verde,  es decir que el preventivo se encuentra en plazo de realizarse
            while (fechaInicial.valueOf() < this.finalAnio.valueOf()) {//Mientras la fecha en la que debe realizarse el periodo sea menor a la última fecha del año
              semanasAPintar.push(this.obtenerNumeroDeSemana(fechaInicial))// Se introduce en un array el número de semana que es
              fechaInicial.setDate(fechaInicial.getDate() + periodo!)//Al terminar se suma la fecha más el periodo para obtener la siguiente fecha a comparar hasta sobrepasar el año
            }
          } else {//Si la fecha en la que deberia realizarse el preventivo es igual a hoy o si es menor
            rojo = true//Se pintará en rojo para mostrar como atrasado
            fechaInicial = new Date(); //Primera fecha hoy
            while (fechaInicial.valueOf() < this.finalAnio.valueOf()) {//Mientras la fecha desde hoy hasta final de año sea menor 
              semanasAPintar.push(this.obtenerNumeroDeSemana(fechaInicial))//Se intriucirá en el array de semanas el numero de semanas en el que teoricamente le tocaría realizar el preventivo
              fechaInicial.setDate(fechaInicial.getDate() + periodo!)// Suma a la fecha el periodo para obtener la siguiente fecha
            }
          }
        } else {//Si no hay fecha validado de ot, tendrá fecha de inicio
          let fechaArray = this.utpreventivo[j].FechaInicio!.split('-')//Obtendremos la fecha y se separa por el - 
          fechaInicial = new Date(Number(fechaArray[0]), Number(fechaArray[1]) - 1, Number(fechaArray[2]), 23, 59,59) //Añadiremos a la fecha de inicio la hora 23:59:59
  
          if(fechaHoy.valueOf() <= fechaInicial.valueOf()){//Si la fecha de hoy sea menor o igual a la fecha inicial del preventivo a las  23:59:59
            rojo = false;//Se pintará en verde ya que aun no ha llegado ni superado su fecha
            while (fechaInicial.valueOf() < this.finalAnio.valueOf()) {//Mientras la fecha en la que debería realizarse el preventivo no supere la última fecha del año
              semanasAPintar.push(this.obtenerNumeroDeSemana(fechaInicial)) //añado a array para pintar en rojo
              fechaInicial.setDate(fechaInicial.getDate() + periodo!)//Se suma a la fecha inicial el periodo para obtener la siguiente fecha
            }
  
          }else {
            rojo = true//Si ya ha superado la fecha del preventivo se pintará en rojo
            fechaInicial = new Date();// Ya que esta retrasado la primera fecha va a ser hoy
            while (fechaInicial.valueOf() < this.finalAnio.valueOf()) {//Mientras sea menor a la última fecha 
              semanasAPintar.push(this.obtenerNumeroDeSemana(fechaInicial))//Se añade el número de semana
              fechaInicial.setDate(fechaInicial.getDate() + periodo!)//Se obtiene ña fecha siguiente
            }
          }
        }
      }else {//Si el preventivo no tiene fecha de la ot o su fecha de inicio no se pintará ninguna fecha
        semanasAPintar = []
      }

      //Tbody
      for (let i = 0; i < this.semanasAPintar + 3; i++) {
        let mycurrent_cell
        let current_text
        //Nombres de UT
        if (i == 0) {//Para la primera columna
          mycurrent_cell = document.createElement('th')
          current_text = document.createTextNode(this.utpreventivo[j].Preventivo!);
          mycurrent_cell.setAttribute("scope","row")
          mycurrent_cell.setAttribute("class","border-start border-end")
          mycurrent_cell.setAttribute("style","background-color:#f2f2f2; position:sticky; left:0;")
          mycurrent_row.onclick = () => this.enviarId(this.utpreventivo[j]) 
          //mycurrent_row.setAttribute("class", "tr:hover{background-color:none} ")     
          mycurrent_row.setAttribute("style", "cursor:pointer")                
          mycurrent_cell.appendChild(current_text)
        //Fin Nombre de UT 
        } else if(i == 1){//Para la segunda columna
          let linea = ''
          mycurrent_cell = document.createElement('th')
          if(this.utpreventivo[j].Linea == null) {//Si el preventivo no tiene linea se escribira vacio
            linea = ''
          }else { linea = this.utpreventivo[j].Linea! }
          current_text = document.createTextNode(linea);
          mycurrent_cell.setAttribute("scope","row")
          mycurrent_cell.setAttribute("class","border-start border-end")
          mycurrent_cell.setAttribute("style","background-color:#f2f2f2; position:sticky; left:0;")
          mycurrent_row.setAttribute("class", "tr:hover{background-color:none}")           
          mycurrent_cell.appendChild(current_text)

        }else if(i==2){//Para la 3a columna
          mycurrent_cell = document.createElement('th')
          current_text = document.createTextNode(this.utpreventivo[j].UbicacionTecnica!);
          mycurrent_cell.setAttribute("scope","row")
          mycurrent_cell.setAttribute("style","background-color:#f2f2f2; position:sticky; left:0;")
          //mycurrent_row.onclick = () => this.enviarId(Number(this.utpreventivo[j].utprevid)) 
          mycurrent_row.setAttribute("class", "tr:hover{background-color:none}")           
          mycurrent_cell.appendChild(current_text)
        }else {
          //Resto de fila semana por semana
          mycurrent_cell = document.createElement('td')
          current_text

          this.numeroSemana = this.semanaActual + (i - 3) //Obtengo el numero de semana 
          if (this.numeroSemana > this.semanas) this.numeroSemana -= this.semanas//Si sobrepasamos el limite de semanas del año ya puede ser 52 o en su caso en año bisiesto 53

          if (rojo == false && semanasAPintar.includes(this.numeroSemana)) {//Pintará los numeros de semana que coincidad con la cabera de los numero de semana en verde
            current_text = document.createTextNode("");//No escribirá nada
            mycurrent_cell.setAttribute('class', 'bg-success border-start border-end')
            mycurrent_cell.appendChild(current_text)

          } else if (rojo && semanasAPintar.includes(this.numeroSemana)) {//Pintara en rojo aquellos numero de semana que coincidan con el numero de semana de las cabeceras
            current_text = document.createTextNode("");
            mycurrent_cell.setAttribute('class', 'bg-danger border-start border-end')
            mycurrent_cell.appendChild(current_text)

          } else if (semanasAPintar.length == 0) {//Si no hay numeros de semana a pintar no se pintara ni en rojo ni en verdde
            current_text = document.createTextNode("");
            mycurrent_cell.setAttribute('style', 'background-color:#d9d9d9; border-start border-end')
            mycurrent_cell.appendChild(current_text)
          }
          else {
            current_text = document.createTextNode("");
            mycurrent_cell.setAttribute('class', 'bg-light')
            mycurrent_cell.appendChild(current_text)
          }
          //Fin resto de semana
        }
        mycurrent_row.appendChild(mycurrent_cell)//Añade cada celda a la fila
      }
      mytbody!.appendChild(mycurrent_row);//añade cada fila al tbody
    }

    //deloquear boton 'ver'
    this.bloqueado = false;
  }
  // Selector 
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
  async enviarId(preventivo:UTPreventivo){

    //Este metodo se ejecutará al hacer clic sobre el preventivo y comprobará que no tenga fecha de ot validada
    let respuesta = await this.utPreventivoService.comprobarSiHayFechaFin(preventivo.utprevid!).toPromise()
    if (respuesta.Estado == 'false' )/**Si NO tiene fecha última OT finalizada*/ {
    //Abrirá el modal para editar la fecha
     const dialogRef = this.dialog.open(EditarFechaComponent,{
      width: 'auto',
      height: 'auto',
      data: {preventivo: preventivo,
      numerosemana: this.semanaActual}
    });   

    dialogRef.afterClosed().subscribe(result => {
     if(result!=undefined)
     {
      this.utPreventivoService.updatePreventivo(result.utprevid, result).subscribe(    
      (res:any) => {
        this.snackbar.open(res.message,"Cerrar", {duration:2000, verticalPosition: 'top', horizontalPosition: 'center'})
        this.selectPreventivos();
      },err => console.log(err))
     }
    })
  }else {//Si ya tiene fecha de ot validada dará un aviso 
    this.snackbar.open("Este preventivo ya tiene una Orden de Trabajo", "Cerrar", {duration:2000, verticalPosition: 'top', horizontalPosition: 'center'})
     
  }
  }
}