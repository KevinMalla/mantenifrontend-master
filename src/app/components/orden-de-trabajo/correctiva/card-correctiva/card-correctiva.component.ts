import { Component, Input, OnInit, Output } from '@angular/core';
import { OrdenDeTrabajoCorrectiva } from 'src/app/models/Orden-de-trabajo/OrdenDeTrabajoCorrectiva';
import { EventEmitter } from '@angular/core';
import { OrdenDeTrabajoService } from 'src/app/services/orden-de-trabajo/orden-de-trabajo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faEquals } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-correctiva',
  templateUrl: './card-correctiva.component.html',
  styleUrls: ['./card-correctiva.component.css']
})
export class CardCorrectivaComponent implements OnInit {
  faEquals = faEquals; //Icono para símbolo =

  @Input() item!:OrdenDeTrabajoCorrectiva
  @Output() abrir: EventEmitter<OrdenDeTrabajoCorrectiva> = new EventEmitter()
  @Output() eliminar: EventEmitter<number> = new EventEmitter()

  tipoUsuario: number = Number(localStorage.getItem('tipoUsuario'))

  constructor(
    private ordenService:OrdenDeTrabajoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  //Envía a su padre: list component la orden
  abrirOrden() {
    this.abrir.emit(this.item)
  }

  //Envía el id del orden a su padre:list component
  eliminarOrden(ordenid:number, event:any){
    event.stopPropagation();//Hace posible que no se abra ña orden ya que se ejecutaría el metodo click que esta en el card
    this.eliminar.emit(ordenid)
  }
}