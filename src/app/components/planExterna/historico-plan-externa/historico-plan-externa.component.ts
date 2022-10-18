import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ListadoPlanExterna } from 'src/app/models/PlanExterna/listadoPlanExterna';
import { MatSort } from '@angular/material/sort';
import { PlanExternaService } from 'src/app/services/planExterna/plan-externa.service';
import { MatPaginator } from '@angular/material/paginator';
import { Periodicidad } from 'src/app/models/Periodicidad/Periodicidad';
import { PeriodicidadService } from 'src/app/services/periodicidad/periodicidad.service';
import { EmpresaExternaService } from 'src/app/services/empresa_externa/empresa-externa.service';
import { EmpresaExterna } from 'src/app/models/EmpresaExterna/EmpresaExterna';



@Component({
  selector: 'app-historico-plan-externa',
  templateUrl: './historico-plan-externa.component.html',
  styleUrls: ['./historico-plan-externa.component.css']
})
export class HistoricoPlanExternaComponent implements OnInit {

  // -- Filtros --
  // anos: number[] = [2020, 2021, 2022, 2049];
  // selectedAno:string = "a";

  // meses: string[] = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO',
  //                   'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  // selectedMes: string = "a";

  defaultValue: string = "x";

  selectedPeriodicidad: string = this.defaultValue;
  periodicidades: Periodicidad[] = [];

  selectedEmpresa: string = this.defaultValue; // id --> Si es "" no filtramos por empresa.
  empresas: EmpresaExterna[] = [];

  selectedEstado: string = this.defaultValue;
  estados: string[] = ['abierto', 'cerrado'];
  // -------------

  displayedColumns: string [] = ['empresa', 'descripcion', 'periodicidad', 'fecha', 'proximaFecha', 'estado'];
  columnNames: string[] = ['Empresa', 'Descripcion', 'Periodicidad', 'Fecha', 'Proxima Fecha', 'Estado'];
  
  dataSource = new MatTableDataSource<ListadoPlanExterna>();
  searchKey!: string;
  
  @ViewChild(MatSort, { static: false })
  sort!: MatSort;

  @ViewChild(MatPaginator, { static: false })
  paginator!: MatPaginator;

  planExterna: ListadoPlanExterna = {
    Descripcion: "",
    Empresa: "",
    Fecha: "",
    Estado: "",
    proximaFecha: "",
    Periodicidad: ""
  }

  historicoPlanExterna: ListadoPlanExterna[] = [];

  constructor(
    private planExternaService: PlanExternaService,
    private periodicidadService: PeriodicidadService,
    private empresaExternaService: EmpresaExternaService
  ) { }

  ngOnInit(): void {
    this.loadHistoricoPlanExterna();
    this.loadPeriodicidades();
    this.loadEmpresasExternas();
  }

  loadHistoricoPlanExterna() {
    this.planExternaService.getAllPlanExternasRelacion().subscribe(
      res => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
      },
      err => {
        console.log(err);
      }
    );
  }

  loadHistoricoFiltrado() {

    this.planExternaService.getHistoricoFiltrado(
                                                this.selectedPeriodicidad, this.selectedEmpresa, this.selectedEstado)
                                      .subscribe(
      res => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res)
      },
      err => {
        console.log(err);
      }
    );

  }

  applyFilter(event: Event) {
    let filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = "";
  }

  // Filtros

  // onChangeAno(value: string) {
  //   this.selectedAno = value.toString();
  //   this.loadHistoricoFiltrado();
  // }

  // onChangeMes(value: string) {
  //   /** Comprobar si es un digito para anteponer el carácter 0  */
  //   let index = this.meses.indexOf(value.toString()); 
  //   index += 1; // El més enero tiene indice 0 pero es el més 1.
  //   this.selectedMes = index.toString();
  //   if (index < 10) {
  //     this.selectedMes = '0'+this.selectedMes;
  //   }
  //   this.loadHistoricoFiltrado();
  // }

  onChangePeriodicidad(id: number) {
    this.selectedPeriodicidad = id.toString();  // Si es "" no filtramos por periodicidad
    this.loadHistoricoFiltrado();
  }

  onChangeEmpresaExterna(id: number) {
    this.selectedEmpresa = id.toString();
    this.loadHistoricoFiltrado();
  }

  onChangeEstados(estado: string) {
    this.selectedEstado = estado;
    this.loadHistoricoFiltrado();
  }

  loadAnos() {

  } 



  // Load select
  loadPeriodicidades() {
    this.periodicidadService.getPeriodicidad().subscribe(
      res => {
        this.periodicidades = res;
        console.log(res)
      },
      err => {
        console.log(err);
      }
    );
  }

  // Load select
  loadEmpresasExternas() {
    this.empresaExternaService.getEmpresasExternas().subscribe(
      res => {
        this.empresas = res;
      },
      err => {
        console.log(err);
      }
    );
  }


}
