import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tienda } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor() { }

  private sharingObservableTienda = new BehaviorSubject<any>(null);

  get tiendaUsuario(): Observable<Tienda> {
    return this.sharingObservableTienda.asObservable();
  }

  updateTiendaUsuario(tienda: Tienda) {
    this.sharingObservableTienda.next(tienda);
  }


}
