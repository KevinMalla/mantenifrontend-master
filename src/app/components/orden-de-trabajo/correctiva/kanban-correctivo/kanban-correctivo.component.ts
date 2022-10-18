import { Component, OnInit } from '@angular/core';
import { OrdenDeTrabajoCorrectiva } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajoCorrectiva';
import { OrdenDeTrabajoService } from 'src/app/services/orden-de-trabajo/orden-de-trabajo.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CambiarPendienteModalComponent } from '../../cambiar-pendiente-modal/cambiar-pendiente-modal.component';
import { CambiarATerminadaModalComponent } from '../../cambiar-a-terminada-modal/cambiar-a-terminada-modal.component';
import { ListSchema } from 'src/app/models/Orden-de-trabajo/listsSchema';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-kanban-correctivo',
  templateUrl: './kanban-correctivo.component.html',
  styleUrls: ['./kanban-correctivo.component.css']
})
export class KanbanCorrectivoComponent implements OnInit {

  lists:ListSchema[] = []
  Planificadas: OrdenDeTrabajoCorrectiva[] = []
  Pendientes: OrdenDeTrabajoCorrectiva[] = []
  Terminadas: OrdenDeTrabajoCorrectiva[] = []
  Validadas: OrdenDeTrabajoCorrectiva[] = []

  tipoUsuario: number = Number(localStorage.getItem('tipoUsuario'))
  operarioId: number = Number(localStorage.getItem('trabajadorMantenimiento'))

  constructor(private ordendetrabajoService:OrdenDeTrabajoService,public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.filtrar();
  }

  //Filtrará las ordenes de trabajo por tipo de usuario
  filtrar(){
  this.ordendetrabajoService.getCorrectivos().subscribe(
    res => {
      this.lists = res;
      console.log(res)
      //Sort para colocar las de prioridad más alta al principio
      this.lists.forEach(element => element.ordenes = element.ordenes.sort((a,b ) => b.PrioridadId - a.PrioridadId))  
      if(this.tipoUsuario==3 || this.tipoUsuario==2 || this.tipoUsuario==4){
        this.lists.forEach(element => element.ordenes = element.ordenes.filter(orden => orden.PersonaResponsableId == this.operarioId))       
      }else if (this.tipoUsuario==6){
        this.lists.forEach(element => element.ordenes = element.ordenes.filter(orden => orden.OperarioId == this.operarioId))       
      }
    })
  }

  //Abrirá el modal para mostrar la orden
  abrirOrden(item: OrdenDeTrabajoCorrectiva) {
      const dialog1 = this.dialog.open(CambiarATerminadaModalComponent, {
        width: 'auto',
        height: '99vh',
        data: { orden: item, modo: 'Editar' },
        panelClass: 'custom-dialog-container',
        disableClose: true,
        hasBackdrop: true
      })
      dialog1.afterClosed().subscribe(
        res => {
          if (res != undefined && item.OrdenId) {
            this.ordendetrabajoService.updateOrden(res, item.OrdenId).subscribe(
              res => this.ngOnInit()
            )
          }
        }
      )
  }

  //Eliminará la orden recibida del hijo: list
  eliminarOrden(item: OrdenDeTrabajoCorrectiva) {
    if (confirm("¿Desea eliminar la orden?")) {
      this.ordendetrabajoService.deleteOrden(item.OrdenId!).subscribe(
        (res: any) => {
          this.snackBar.open(res.message, "Cerrar", { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' })
          this.ngOnInit();
        },
        err => {
          this.snackBar.open("No se puede eliminar la Orden", "Cerrar", { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' });
          console.error(err)
        })
    }
  }

  actualizar(item:boolean){
    if(item==true){
      this.ngOnInit();
    }
  }
}
