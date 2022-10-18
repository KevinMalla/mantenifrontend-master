import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OrdenDeTrabajoCorrectiva } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajoCorrectiva';
import { OrdenDeTrabajoService } from 'src/app/services/orden-de-trabajo/orden-de-trabajo.service';
import { ListSchema } from 'src/app/models/Orden-de-trabajo/listsSchema';
import { CambiarPendienteModalComponent } from '../../cambiar-pendiente-modal/cambiar-pendiente-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CambiarATerminadaModalComponent } from '../../cambiar-a-terminada-modal/cambiar-a-terminada-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() list!: ListSchema;
  @Output() abrir: EventEmitter<OrdenDeTrabajoCorrectiva> = new EventEmitter()
  @Output() eliminar: EventEmitter<number> = new EventEmitter()
  @Output() dropped: EventEmitter<boolean> = new EventEmitter()
  
  activeNumIndex!: number;

  tipoUsuario: number = Number(localStorage.getItem('tipoUsuario'))
  constructor(private ordenService: OrdenDeTrabajoService,public dialog: MatDialog) {
   }

  ngOnInit(): void {
  }

  //controla el drop de las cards
  drop(event: CdkDragDrop<string[]>) {
    //Si arrastra de la 1a columna a la 2da abrira el modal
    if(event.previousContainer.id=="Planificadas" && event.container.id=="Pendientes"){
        const dialog1 = this.dialog.open(CambiarPendienteModalComponent, {
          width: 'auto',
          height: 'auto',
          data: event.item.data
        })
        dialog1.afterClosed().subscribe(
          res => {
            if (res != undefined) {
            this.ordenService.updatePlanificada(res, event.item.data.OrdenId).subscribe(
              res => {
                    transferArrayItem(event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex);  
                    this.dropped.emit(true)     
              }, (err:any) => {console.log(err)}
            )}
          })   
          //Si arrastra de la segunda columna a la tercera
    }else if(event.previousContainer.id=="Pendientes" && event.container.id=="Terminadas"){
      //Abrirá el modal en el modo terminar; el modo terminar deja editar a los operarios el comentario y el tiempo empleado
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
          this.ordenService.updatePendiente(res, event.item.data.OrdenId).subscribe(
            res => {
                  transferArrayItem(event.previousContainer.data,
                  event.container.data,
                  event.previousIndex,
                  event.currentIndex);
                  this.dropped.emit(true)       
            }, (err:any) => {console.log(err)}
          )}
        })
        //Si arrastra a la columna de validadas
    }else if(event.previousContainer.id=="Terminadas" && event.container.id=="Validadas"){
      if (confirm("¿Validar la orden de trabajo? ")) {
        this.ordenService.updateTerminada(event.item.data.OrdenId).subscribe(
          res => {
            transferArrayItem(event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex);
              this.dropped.emit(true)   
          }, err => console.log(err)
        );
      }
      //Si arrastra de la 3a columna a las 2da; es decir hacia atras, volverá a abrir el modal donde se le asigna la prioridad y el operario
    }else if(event.previousContainer.id=="Terminadas" && event.container.id=="Pendientes"){
      const dialog1 = this.dialog.open(CambiarPendienteModalComponent, {
        width: 'auto',
        height: 'auto',
        data: event.item.data
      })
      dialog1.afterClosed().subscribe(
        res => {
          if (res != undefined) {
          this.ordenService.updatePlanificada(res, event.item.data.OrdenId).subscribe(
            res => {
                  transferArrayItem(event.previousContainer.data,
                  event.container.data,
                  event.previousIndex,
                  event.currentIndex);  
                  this.dropped.emit(true)      
            }, (err:any) => {console.log(err)}
          )}
        })      
    }  
  }

  //Envia al padre: kanban, la orden recibida desde el hijo:card
  handleAbrir(item: OrdenDeTrabajoCorrectiva){
    this.abrir.emit(item)
  }
  //Envia al padre: kanban, el id recibida desde el hijo:card

  handleEliminar(item: number){
    this.eliminar.emit(item)
  }

}
