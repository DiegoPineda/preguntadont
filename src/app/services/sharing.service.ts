import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Partida, Tienda } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor() { }


  //------------------------Intercambio de info para actualizar navbar al comprar----------------------------------
  private sharingObservableTienda = new BehaviorSubject<any>(null);

  get tiendaUsuario(): Observable<any> {
    return this.sharingObservableTienda.asObservable();
  }

  updateTiendaUsuario(tienda: any) {
    this.sharingObservableTienda.next(tienda);
  }


  //---------------------------Envio la categoria de la partida a preguntas---------------------------------------------
  private categoriaObservable = new BehaviorSubject<boolean | string | null>(null);

  get categoria(): Observable<boolean | string | null> {
    return this.categoriaObservable.asObservable();
  }

  enviarCategoria(categoria: string) {
    this.categoriaObservable.next(categoria);
  }

  //-------------------------------envio el resultado de la pregunta a partida---------------------------------

  private respuestaObservable = new BehaviorSubject<boolean | null>(null);

  get recibirResultado(): Observable<boolean | null> {
    return this.respuestaObservable.asObservable();
  }

  enviarResultado(esCorrecta: boolean): void {
    this.respuestaObservable.next(esCorrecta);
  }


//---------------------------------envio de spin a jugar partida----------------------------

  private categoriaObservableSpin = new BehaviorSubject<string | null>(null);

  get recibirCategoriaSpin(): Observable<string | null> {
    return this.categoriaObservableSpin.asObservable();
  }

  enviarCategoriaSpin(categoria: string) {
    this.categoriaObservableSpin.next(categoria);
  }
}
