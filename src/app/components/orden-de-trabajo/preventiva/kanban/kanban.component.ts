import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { OrdenDeTrabajoService } from 'src/app/services/orden-de-trabajo/orden-de-trabajo.service';
import { OrdenDeTrabajoPreventiva } from '../../../../models/Orden-de-trabajo/OrdenDeTrabajoPreventiva'
import { MatDialog } from '@angular/material/dialog';
import { CambiarPendienteModalComponent } from '../../cambiar-pendiente-modal/cambiar-pendiente-modal.component';
import { CambiarATerminadaModalComponent } from '../../cambiar-a-terminada-modal/cambiar-a-terminada-modal.component';
import { OperarioService } from 'src/app/services/operario/operario.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  preventivoPendiente: OrdenDeTrabajoPreventiva[] = []
  preventivoPlanificada: OrdenDeTrabajoPreventiva[] = []
  preventivoTerminada: OrdenDeTrabajoPreventiva[] = []
  preventivoValidada: OrdenDeTrabajoPreventiva[] = []

  tipoUsuario: number = Number(localStorage.getItem('tipoUsuario'))
  operarioId: number = Number(localStorage.getItem('trabajadorMantenimiento'))

  constructor(private ordendetrabajoService: OrdenDeTrabajoService, public dialog: MatDialog, private operarioService: OperarioService) { }

  ngOnInit(): void {

    this.getOrdenPreventivoPlanificada();
    this.getOrdenPreventivoPendiente();
    this.getOrdenPreventivoTerminada();
    this.getOrdenPreventivoValidada();
  }

  //Cuando se arrastre a la columna de pendiente; abrirá el modal 
  dropPendiente(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const dialog1 = this.dialog.open(CambiarPendienteModalComponent, {
        width: 'auto',
        height: 'auto',
        data: event.item.data
      })
      dialog1.afterClosed().subscribe(
        res => {
          if (res != undefined) {
            this.ordendetrabajoService.updatePlanificada(res, event.item.data.OrdenId).subscribe(
              res => {
                transferArrayItem(event.previousContainer.data,
                  event.container.data,
                  event.previousIndex,
                  event.currentIndex);
                this.ngOnInit();
              }, err => console.log(err)
            );
          }
        })
    }
  }
//Cuando se haga drop abrirá el modal; en modo terminar
  dropTerminada(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const dialog1 = this.dialog.open(CambiarATerminadaModalComponent, {
        width: 'auto',
        height: '99vh',
        data: { orden: event.item.data, modo: 'Terminar' },
        panelClass: 'custom-dialog-container',
        disableClose: true,
        hasBackdrop: true
      })
      dialog1.afterClosed().subscribe(
        res => {
          if (res != undefined) {
            this.ordendetrabajoService.updatePendiente(res, event.item.data.OrdenId).subscribe(
              res => {
                transferArrayItem(event.previousContainer.data,
                  event.container.data,
                  event.previousIndex,
                  event.currentIndex);
                this.ngOnInit();
              }, err => console.log(err)
            );
          }
        })
    }
  }
//Cuando se haga drop a la columna de validado se abrirla un alert de confirmación
  dropValidada(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (confirm("¿Validar la orden de trabajo? ")) {
        this.ordendetrabajoService.updateTerminada(event.item.data.OrdenId).subscribe(
          res => {
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
            this.ngOnInit();
          }, err => console.log(err)
        );
      }
    }
  }

  //Obtiene las ordenes planificadas; es decir con estado 1
  getOrdenPreventivoPlanificada() {
    this.ordendetrabajoService.getPreventivoPlanificada().subscribe(
      res => {
        this.preventivoPlanificada = res
      }
    )
  }
  //Obtiene las ordenes pendientes; es decir con estado 2
  getOrdenPreventivoPendiente() {
    this.ordendetrabajoService.getPreventivoPendiente().subscribe(
      res => {
        if (this.tipoUsuario == 1 || this.tipoUsuario == 5) {
          this.preventivoPendiente = res
        } else {
          this.preventivoPendiente = res.filter(orden => orden.OperarioId == this.operarioId)
        }

      })
  }
  //Obtiene las ordenes terminadas; es decir con estado 3
  getOrdenPreventivoTerminada() {
    this.ordendetrabajoService.getPreventivoTerminada().subscribe(
      res => {
        if (this.tipoUsuario == 1 || this.tipoUsuario == 5) {
          this.preventivoTerminada = res
        } else {
          this.preventivoTerminada = res.filter(orden => orden.OperarioId == this.operarioId)
        }
      })
  }
  //Obtiene las ordenes validadas; es decir con estado 4
  getOrdenPreventivoValidada() {
    this.ordendetrabajoService.getPreventivoValidada().subscribe(
      res => {
        this.preventivoValidada = res
      })
  }

  //Abrirá la orden en modo editar
  abrirOrden(item: any) {
    //if (this.tipoUsuario == 1 || this.tipoUsuario == 5) {
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
          if (res != undefined) {
            this.ordendetrabajoService.updateOrden(res, item.OrdenId).subscribe(
              res => this.ngOnInit()
            )
          }
        }
      )
    //}
  }
}