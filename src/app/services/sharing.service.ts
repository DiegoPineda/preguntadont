import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tienda } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor() { }

  private sharingObservableTienda = new BehaviorSubject<any>(null);

  get tiendaUsuario(): Observable<any> {
    return this.sharingObservableTienda.asObservable();
  }

  updateTiendaUsuario(tienda: any) {
    this.sharingObservableTienda.next(tienda);
  }

  private categoriaObservable = new BehaviorSubject<string | null>(null);

  get categoria(): Observable<string | null> {
    return this.categoriaObservable.asObservable();
  }

  enviarCategoria(categoria: string) {
    this.categoriaObservable.next(categoria);
  }

}
