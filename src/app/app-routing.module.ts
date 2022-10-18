import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperarioComponent } from './components/operario/operario.component';
import { CrearCorrectivoComponent } from './components/orden-de-trabajo/correctiva/crear-correctivo/crear-correctivo.component';
import { KanbanComponent } from './components/orden-de-trabajo/preventiva/kanban/kanban.component';
import { KanbanCorrectivoComponent } from './components/orden-de-trabajo/correctiva/kanban-correctivo/kanban-correctivo.component';
import { CrearPreventivoComponent } from './components/preventivo/crear-preventivo/crear-preventivo.component';
import { PlanPreventivoComponent } from './components/preventivo/plan-preventivo/plan-preventivo.component';

import { TareaComponent } from './components/tarea/visualizar-tareas/tarea.component';
import { CrearUbicacionComponent } from './components/ubicacion-tecnica/crear-ubicacion/crear-ubicacion.component';
import { SeleccionarUbicacionComponent } from './components/ubicacion-tecnica/seleccionar-ubicacion/seleccionar-ubicacion.component';
import { ConsultarOrdenesComponent } from './components/orden-de-trabajo/correctiva/consultar-ordenes/consultar-ordenes.component';
import { OrdenComponent } from './components/orden-de-trabajo/orden/orden.component';
import { AdministrarComponent } from './components/preventivo/administrar/administrar.component';
import { MaterialComponent } from './components/material//lista/material.component';
import { PeriodicidadComponent } from './components/periodicidad/periodicidad.component';
import { ConsultarComponent } from './components/orden-de-trabajo/preventiva/consultar/consultar.component';
import { GestionarGastoComponent } from './components/material/gestionar-gasto/gestionar-gasto.component';
import { AddMaterialUtilizadoComponent } from './components/material/add-material-utilizado/add-material-utilizado.component';
import { CrearPlanExternaComponent } from './components/planExterna/crear-plan-externa/crear-plan-externa.component';
import { ListarPlanExternaComponent } from './components/planExterna/listar-plan-externa/listar-plan-externa.component';
import { CrearEmpresaComponent } from './components/empresa_externa/crear-empresa/crear-empresa.component';
import { ListarEmpresaExternaComponent } from './components/empresa_externa/listar-empresa-externa/listar-empresa-externa.component';
import { PanelPlanExternaComponent } from './components/planExterna/panel-plan-externa/panel-plan-externa.component';
import { HistoricoPlanExternaComponent } from './components/planExterna/historico-plan-externa/historico-plan-externa.component';


const routes: Routes = [
  {
    path: 'preventivo',
    children: [{
      path: 'tarea',
      component: TareaComponent
    },
    {
      path: 'crear',
      component: CrearPreventivoComponent
    },
    {
      path: 'plan',
      component: PlanPreventivoComponent
    },
    {
      path: 'administrar',
      component: AdministrarComponent
    }
    ]
  },
  {
    path: 'ubicaciontecnica',
    children: [{
      path: 'visualizar',
      component: SeleccionarUbicacionComponent
    },
    {
      path: 'administrar',
      component: CrearUbicacionComponent
    }]
  },
  {
    path: 'operario',
    component: OperarioComponent
  },
  {
    path: 'ordendetrabajo',
    children: [{
      path: 'kanban',
      component: KanbanComponent,
    }, {
      path: 'crearorden',
      component: CrearCorrectivoComponent
    }, {
      path: 'kanbancorrectiva',
      component: KanbanCorrectivoComponent
    }, {
      path: 'consultar/correctivo',
      component: ConsultarOrdenesComponent
    }, {
      path: 'consultar/preventivo',
      component: ConsultarComponent
    },
    {
      path: 'orden/:ordenid',
      component: OrdenComponent
    }]
  }, {
    path: 'material',
    children: [{
      path: 'administrar',
      component: MaterialComponent
     },{
       path: 'descontar',
       component: GestionarGastoComponent
     },{
      path: 'add',
      component: AddMaterialUtilizadoComponent
     }]

  },
  {
    path: 'planexterna',
    children: [
      {
        path: 'addempresa',
        component: CrearEmpresaComponent
      },
      {
        path: 'listempresas',
        component: ListarEmpresaExternaComponent
      },
      {
        path: 'add',
        component: CrearPlanExternaComponent
      },
      {
        path: 'listar',
        component: ListarPlanExternaComponent
      },
      {
        path: 'panel',
        component: PanelPlanExternaComponent
      },
      {
        path: 'historico',
        component: HistoricoPlanExternaComponent
      }

    ]
  },
  {
    path: 'periodicidad',
    component: PeriodicidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
