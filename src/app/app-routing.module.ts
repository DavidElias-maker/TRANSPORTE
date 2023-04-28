import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColaboradoresListComponent } from './components/colaboradores/colaboradores-list/colaboradores-list.component';



const routes: Routes = [
  {
    path: '',
    component: ColaboradoresListComponent


  },
  {
    path: 'Colaboradores',
    component: ColaboradoresListComponent,

  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
