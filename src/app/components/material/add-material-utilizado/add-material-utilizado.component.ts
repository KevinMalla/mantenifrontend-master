import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Gasto } from 'src/app/models/Material/Gasto';
import { Material } from 'src/app/models/Material/Material';
import { Trabajador } from 'src/app/models/Operario/Trabajador';
import { Seccion } from 'src/app/models/ubicacion-tecnica/Seccion';
import { GastoMaterialService } from 'src/app/services/gastoMaterial/gasto-material.service';
import { MaterialService } from 'src/app/services/material/material.service';
import { OperarioService } from 'src/app/services/operario/operario.service';
import { SeccionesService } from 'src/app/services/ubicacion-tecnica/seccion/secciones.service';

interface Provisional {
  Material: Material,
  Cantidad?: number
}

@Component({
  selector: 'app-add-material-utilizado',
  templateUrl: './add-material-utilizado.component.html',
  styleUrls: ['./add-material-utilizado.component.css']
})

export class AddMaterialUtilizadoComponent implements OnInit {

  trabajadores: Trabajador[] = [] //Lista de trabajadores
  materiales: Material[] = [] //Array para la lista de materiales

  material: Provisional = { Material: { MatId: 0, Material: '', Descripcion: '' }, Cantidad: 0 } //Material de tipo Provisional ya que se usa para agregar al array de materiales antes de confirmar

  listaProvisional: Provisional[] = [] // Array para la lista provisional de materiales a añadir
  secciones: Seccion[] = [] //Lista de secciones 
  
  materialForm = this.fb.group({
    trabajadorControl: ['', Validators.required],
    lineaControl: ['', Validators.required]
  });

  constructor(private gastoService: GastoMaterialService, private materialService: MaterialService, private snackBar: MatSnackBar, private seccionService:SeccionesService,
    private operarioService:OperarioService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.getMaterial();
    this.getSecciones();
    this.getTrabajador();
  }

  //Obtiene todas las secciones guardadas en la bbdd
  getSecciones(){
    this.seccionService.getSecciones().subscribe(
      res => 
      {
      this.secciones = res
      //Filtrar por zona. Zona 7 BUS - ZONA 8 CONDUCTOR
      this.secciones = this.secciones.filter(seccion => seccion.ZonaId == 7 || seccion.ZonaId==8 )         
      }
      )
  }

  //Obtiene todos los materiales guardados en la bbdd materiales
  getMaterial() {
    this.materialService.getMaterial().subscribe(
      res => this.materiales = res
    )
  }

  //Obtiene todos los trabajadores de la bbdd
  getTrabajador(){
    this.operarioService.getTrabajador().subscribe(
      res => {
        this.trabajadores = res
        //Filtra los trabajadores por tipo de usuario
        //this.trabajadores = this.trabajadores.filter(trabajador => trabajador.TipoUsuario == 3)
      }
    )
  }

  //Quita el material de la lista de materiales provisional
  quitar(util: number) {
    this.listaProvisional.splice(util, 1)
  }

  //Agrega el material elegido a la lista de materiales provisional
  agregarMaterial() {
    if (this.material.Material == null || this.material.Material.MatId == 0 || this.material.Cantidad == 0) {
      this.snackBar.open("Debe elegir material y cantidad", "Cerrar", { duration: 2000, verticalPosition: 'top', horizontalPosition: 'center' })
      return;
    }
    this.listaProvisional.push(this.material)
    this.material = { Material: { MatId: 0, Material: '', Descripcion: '' }, Cantidad:0 }
  }

  //Confirma la accion de almacenar los materiales utilizados en la base de datos
  confirmar() {
    this.listaProvisional.forEach(material =>{
      this.gastoService.addGastoMaterial(material.Material.MatId!, material.Cantidad!, this.materialForm.controls.trabajadorControl.value, this.materialForm.controls.lineaControl.value).subscribe(
        res => {
          this.snackBar.open("Material añadido", "Cerrar", { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' })
          this.listaProvisional = []
          this.materialForm.reset();
        }, err => console.log(err)
      )      
    }
    )
  }
}