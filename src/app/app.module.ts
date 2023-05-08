import { EventEmitter, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColaboradoresListComponent } from './components/colaboradores/colaboradores-list/colaboradores-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColaboradoresModalComponent } from './components/colaboradores/colaboradores-modal/colaboradores-modal.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import {DatePipe} from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SucursalesListComponent } from './components/Sucursales/sucursales-list/sucursales-list.component';
import { SucursalesModalComponent } from './components/Sucursales/sucursales-modal/sucursales-modal.component'
import { EventEmitterService } from './services/event-emitter.service';
import { TransportistasListComponent } from './components/transportistas/transportistas-list/transportistas-list.component';
import { TransportistasModalComponent } from './components/transportistas/transportistas-modal/transportistas-modal.component';
import { ViajesListComponent } from './components/Viajes/viajes-list/viajes-list.component';
import { MatInputModule} from '@angular/material/input'
import { MatAutocompleteModule} from '@angular/material/autocomplete'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SucursalescolaboradoresListComponent } from './components/sucursalescolaboradores/sucursalescolaboradores-list/sucursalescolaboradores-list.component';
import { SucursalescolaboradoresModalComponent } from './components/sucursalescolaboradores/sucursalescolaboradores-modal/sucursalescolaboradores-modal.component';







@NgModule({
  declarations: [
    AppComponent,
    ColaboradoresListComponent,
    ColaboradoresModalComponent,
    SucursalesListComponent,
    SucursalesModalComponent,
    TransportistasListComponent,
    TransportistasModalComponent,
    ViajesListComponent,
    SucursalescolaboradoresListComponent,
    SucursalescolaboradoresModalComponent





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    OrderModule,
    NgxPaginationModule,
    DatePipe,
    NgxMaskDirective,
    NgxMaskPipe,
    MatInputModule,
    MatAutocompleteModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [provideNgxMask(),EventEmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
