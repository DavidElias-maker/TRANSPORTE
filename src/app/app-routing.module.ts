import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradoresListComponent } from './components/colaboradores/colaboradores-list/colaboradores-list.component';
import { SucursalesListComponent } from './components/Sucursales/sucursales-list/sucursales-list.component';
import { config } from 'rxjs';



const routes: Routes = [

  {
    path: 'Colaboradores',
    component: ColaboradoresListComponent,

  },
  {
    path: 'Sucursales',
    component: SucursalesListComponent,

  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes , {

    onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
