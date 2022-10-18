import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-borrar-dialog',
  templateUrl: './borrar-dialog.component.html',
  styleUrls: ['./borrar-dialog.component.css']
})
export class BorrarDialogComponent {

  constructor(public dialog: MatDialog) { }


}

