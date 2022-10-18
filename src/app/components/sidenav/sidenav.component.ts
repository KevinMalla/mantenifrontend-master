import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Input() planta!:number;
  @Input() trabajador!:string;
  @Input() tipo!:number;

  mode = new FormControl('side');
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
  panelOpenState = true;

  imagen: boolean = true; 


  constructor() { }

  ngOnInit(): void {

  }
}