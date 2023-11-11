import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tienda } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioTiendaService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3000/tienda/";

  getUserTienda(userId: number): Observable<Tienda> {
    return this.http.get<Tienda>(this.url + userId);
  }

  updateUserTienda(usuarioTienda: Tienda | undefined){
    if(usuarioTienda !== undefined){
      this.http.put<Tienda>(this.url+usuarioTienda.id, usuarioTienda)
        .subscribe({
          next: data => {
            console.log("Tienda del usuario actualizada correctamente");
          },
          error: error => {
            console.error('Hubo un error al actualizar la tienda del usuario', error);
          }
        });

    }
  }
  
}
