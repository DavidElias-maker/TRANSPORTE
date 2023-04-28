import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColaboradoresListComponent } from './components/colaboradores/colaboradores-list/colaboradores-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColaboradoresModalComponent } from './components/colaboradores/colaboradores-modal/colaboradores-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    ColaboradoresListComponent,
    ColaboradoresModalComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
