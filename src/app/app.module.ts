import { LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { traduccion } from './traduccionPaginator';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SeleccionarUbicacionComponent } from './components/ubicacion-tecnica/seleccionar-ubicacion/seleccionar-ubicacion.component';
import { TareaComponent } from './components/tarea/visualizar-tareas/tarea.component';
import { CrearTareaComponent } from './components/tarea/crear-tarea/crear-tarea.component';
import { EditarTareaComponent } from './components/tarea/editar-tarea/editar-tarea.component';
import { AgregarTareaComponent } from './components/tarea/agregar-tarea/agregar-tarea.component';
import { CrearUbicacionComponent } from './components/ubicacion-tecnica/crear-ubicacion/crear-ubicacion.component';
import { EditarUbicacionComponent } from './components/ubicacion-tecnica/editar-ubicacion/editar-ubicacion.component';
import { OperarioComponent } from './components/operario/operario.component';
import { CrearPreventivoComponent } from './components/preventivo/crear-preventivo/crear-preventivo.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter'
import { PlanPreventivoComponent } from './components/preventivo/plan-preventivo/plan-preventivo.component';
import { EditarFechaComponent } from './components/preventivo/editar-fecha/editar-fecha.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { KanbanComponent } from './components/orden-de-trabajo/preventiva/kanban/kanban.component';
import { CambiarPendienteModalComponent } from './components/orden-de-trabajo/cambiar-pendiente-modal/cambiar-pendiente-modal.component';
import { registerLocaleData } from '@angular/common';
import localePy from '@angular/common/locales/es-PY';
import { CambiarATerminadaModalComponent } from './components/orden-de-trabajo/cambiar-a-terminada-modal/cambiar-a-terminada-modal.component';
import { DetalleGastoComponent } from './components/orden-de-trabajo/detalle-gasto/detalle-gasto.component';
import { TareasComponent } from './components/orden-de-trabajo/tareas/tareas.component';
import { CrearCorrectivoComponent } from './components/orden-de-trabajo/correctiva/crear-correctivo/crear-correctivo.component';
import { KanbanCorrectivoComponent } from './components/orden-de-trabajo/correctiva/kanban-correctivo/kanban-correctivo.component';
import { CardCorrectivaComponent } from './components/orden-de-trabajo/correctiva/card-correctiva/card-correctiva.component';
import { ListComponent } from './components/orden-de-trabajo/correctiva/list/list.component';
import { ConsultarOrdenesComponent } from './components/orden-de-trabajo/correctiva/consultar-ordenes/consultar-ordenes.component';
import { OrdenComponent } from './components/orden-de-trabajo/orden/orden.component';
import { AdministrarComponent } from './components/preventivo/administrar/administrar.component';
import { MaterialComponent } from './components/material/lista/material.component';
import { PeriodicidadComponent } from './components/periodicidad/periodicidad.component';
import { ConsultarComponent } from './components/orden-de-trabajo/preventiva/consultar/consultar.component';
import {DatePipe} from '@angular/common';   
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GestionarGastoComponent } from './components/material/gestionar-gasto/gestionar-gasto.component';
import { AddMaterialUtilizadoComponent } from './components/material/add-material-utilizado/add-material-utilizado.component';
import { CrearPlanExternaComponent } from './components/planExterna/crear-plan-externa/crear-plan-externa.component';
import { PanelPlanExternaComponent } from './components/planExterna/panel-plan-externa/panel-plan-externa.component';
import { ListarPlanExternaComponent } from './components/planExterna/listar-plan-externa/listar-plan-externa.component';
import { CrearEmpresaComponent } from './components/empresa_externa/crear-empresa/crear-empresa.component';
import { BorrarDialogComponent } from './components/planExterna/listar-plan-externa/borrar-dialog/borrar-dialog.component';
import { ListarEmpresaExternaComponent } from './components/empresa_externa/listar-empresa-externa/listar-empresa-externa.component';
import { EditarEmpresaExternaComponent } from './components/empresa_externa/editar-empresa-externa/editar-empresa-externa.component';
import { EditarPlanExternaComponent } from './components/planExterna/editar-plan-externa/editar-plan-externa.component';
import { AbrirPanelPlanExternaDialogComponent } from './components/planExterna/abrir-panel-plan-externa-dialog/abrir-panel-plan-externa-dialog.component';
import { HistoricoPlanExternaComponent } from './components/planExterna/historico-plan-externa/historico-plan-externa.component';
registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    SidenavComponent,
    SeleccionarUbicacionComponent,
    TareaComponent,
    CrearTareaComponent,
    EditarTareaComponent,
    AgregarTareaComponent,
    CrearUbicacionComponent,
    EditarUbicacionComponent,
    OperarioComponent,
    CrearPreventivoComponent,
    PlanPreventivoComponent,
    EditarFechaComponent,
    KanbanComponent,
    CambiarPendienteModalComponent,
    CambiarATerminadaModalComponent,
    DetalleGastoComponent,
    TareasComponent,
    CrearCorrectivoComponent,
    KanbanCorrectivoComponent,
    CardCorrectivaComponent,
    ListComponent,
    ConsultarOrdenesComponent,
    OrdenComponent,
    AdministrarComponent,
    MaterialComponent,
    PeriodicidadComponent,
    ConsultarComponent,
    GestionarGastoComponent,
    AddMaterialUtilizadoComponent,
    CrearPlanExternaComponent,
    PanelPlanExternaComponent,
    ListarPlanExternaComponent,
    CrearEmpresaComponent,
    BorrarDialogComponent,
    ListarEmpresaExternaComponent,
    EditarEmpresaExternaComponent,
    EditarPlanExternaComponent,
    AbrirPanelPlanExternaDialogComponent,
    HistoricoPlanExternaComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MatPaginatorIntl, useValue: traduccion()},
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    { provide: LOCALE_ID, useValue: 'es' },
    {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
],
  bootstrap: [AppComponent]
})
export class AppModule {}