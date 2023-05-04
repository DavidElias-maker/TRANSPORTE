import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradoresListComponent } from './components/colaboradores/colaboradores-list/colaboradores-list.component';
import { SucursalesListComponent } from './components/Sucursales/sucursales-list/sucursales-list.component';
import { config } from 'rxjs';
import { TransportistasListComponent } from './components/transportistas/transportistas-list/transportistas-list.component';
import { ViajesListComponent } from './components/Viajes/viajes-list/viajes-list.component';



const routes: Routes = [

  {
    path: 'Colaboradores',
    component: ColaboradoresListComponent

  },
  {
    path: 'Sucursales',
    component: SucursalesListComponent

  },
  {
    path: 'Transportistas',
    component: TransportistasListComponent

  },
  {
    path: 'Viajes',
    component: ViajesListComponent

  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
