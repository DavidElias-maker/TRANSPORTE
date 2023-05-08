import { Injectable,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
invokecolaboradoreslistcomponent = new EventEmitter();
invokesucursaleslistcomponent = new EventEmitter();
invoketransportistalistcomponent = new EventEmitter();
invokesucursalcolaboradorlistcomponent = new EventEmitter();

constructor(){}

subsvar:Subscription | undefined;
oncolaboradorescomponentClick(){
  this.invokecolaboradoreslistcomponent.emit();
}

onsucursalescomponentClick(){
  this.invokesucursaleslistcomponent.emit();
}

ontransportistacomponentClick(){
  this.invoketransportistalistcomponent.emit();
}
onsucursalcolaboradorcomponentClick(){
  this.invokesucursalcolaboradorlistcomponent.emit();
}

}
