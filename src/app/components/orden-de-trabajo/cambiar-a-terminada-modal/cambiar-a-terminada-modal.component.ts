import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Material } from 'src/app/models/Material/Material';
import { MaterialService } from 'src/app/services/material/material.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetalleGastoComponent } from '../detalle-gasto/detalle-gasto.component';
import { TareasComponent } from '../tareas/tareas.component';
import { GastoMaterialService } from 'src/app/services/gastoMaterial/gasto-material.service';
import { Trabajador } from 'src/app/models/Operario/Trabajador';
import { OperarioService } from 'src/app/services/operario/operario.service';
import { OrdenDeTrabajoService } from 'src/app/services/orden-de-trabajo/orden-de-trabajo.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cambiar-a-terminada-modal',
  templateUrl: './cambiar-a-terminada-modal.component.html',
  styleUrls: ['./cambiar-a-terminada-modal.component.css']
})
export class CambiarATerminadaModalComponent implements OnInit {


  constructor(private router: Router, public dialog: MatDialog,private snackBar: MatSnackBar, private materialService: MaterialService,private fb: FormBuilder,public dialogRef: MatDialogRef<CambiarATerminadaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private gastoService:GastoMaterialService,
    private operarioService: OperarioService, private ordenDeTrabajoService: OrdenDeTrabajoService) { }

    materiales: Material[] = []
    material: Material = {MatId:0,Material: '', Descripcion:''}
    cantidad:number = 0
    proximaRevi!: Date;
    tipoUsuario:number = Number(localStorage.getItem('tipoUsuario'))
    operario: any = {Codigo: 0, Nombre: ''}
    operarios: any[] = []
    //operarioAsignado: number = 0  // Código del operario al que se le asigna el correctivo. (Ha de poder ser modificado)
    

  terminada = this.fb.group({
    Comentario: [''],
    TiempoEmpleado: ['', Validators.required]
  })

  ngOnInit(): void {
    //Inserta los valores en el formulario para poder editar su contenido
    this.terminada.patchValue({Comentario: this.data.orden.Comentario, TiempoEmpleado: this.data.orden.TiempoEmpleado})      
    this.getMaterial(); 
    this.getOperarios();
    

    //Si es tipo 1 o 5 se insertara el comentario del responsable en el textarea para poder editarlo
    if(this.tipoUsuario==1 || this.tipoUsuario==5)
   {
    this.terminada.addControl('ComentarioResponsable', this.fb.control(''))
    this.terminada.patchValue({ComentarioResponsable:this.data.orden.ComentarioResponsable})      
   } 

   //Si la orden es de tipo 1 'Preventivo' dará la fecha de proxima revisión
   if(this.data.orden.TipoId==1)
   {
    this.proximaRevi = new Date() 
    this.proximaRevi.setDate(this.proximaRevi.getDate() + this.data.orden.Dias);
   }
  }

  getMaterial(){
    this.materialService.getMaterial().subscribe(
        res => this.materiales = res
    ) 
  }

  //Avisará si no se ha elegido material y cantidad, añade el material a la orden
  agregarMaterial(){
    console.log( 'holi')
    if(this.material.MatId==0 || this.cantidad==0)
    {
      this.snackBar.open("Debe elegir material y cantidad", "Cerrar" ,{ duration:2000, verticalPosition: 'top', horizontalPosition:'center'})
      return;
    } 
    let operario = Number(localStorage.getItem('trabajadorMantenimiento'))
    this.gastoService.addGastoMaterialAOrden(this.data.orden.OrdenId,this.material.MatId!, this.cantidad, operario).subscribe(
    res=> {   
      this.snackBar.open("Material añadido", "Cerrar", {duration:2000, horizontalPosition:'center', verticalPosition:'top'})
    }, err => console.log(err)
    )
  }

  editarOperario(){

  }

  //abre un modal donde se ve la lista de materiales de una orden pasada al modal
  verDetalleGasto(){
    const dialog1 = this.dialog.open(DetalleGastoComponent,{
      width: 'auto',
      height: 'auto',
      data: this.data.orden.OrdenId,
      panelClass: 'custom-dialog-container'
    })
  }

  //Abrirá una lista de tareas de a la orden
  abrirListadoTareas(){
    const dialog1 = this.dialog.open(TareasComponent,{
      width: 'auto',
      height: 'auto',
      data: this.data.orden.OrdenId,
      panelClass: 'custom-dialog-container'
    })
  }

  cancelar():void{
    this.dialogRef.close();
  }

  getOperarios() {
    console.log(this.data.orden)
    this.operarioService.getUsuario().subscribe(
      res => {
        this.operarios = res;
        console.log(res)
        console.log("--> " + this.data.orden.OrdenId)

      }
    )
  }

  actualizarOperarioDeOrden(ordenId:number, nuevoOperario: any) {
    this.ordenDeTrabajoService.actualizarOperarioOrden(ordenId, nuevoOperario.Codigo, {d:'22'}).subscribe(
      res => {
        console.log(res)
      }
    );
    console.log("Orden: " + ordenId + " - Operario: " + JSON.stringify(nuevoOperario.Codigo))
    this.dialogRef.close();
    location.reload()
    this.snackBar.open("Operario actualizado", "", {duration: 3000});
  }

  // reloadComponent() {
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate(['./']);
  // }


}
