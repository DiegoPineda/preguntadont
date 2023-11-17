import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tienda } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioTiendaService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:3070/tienda/";

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
  




  async getUserTienda2(id: number): Promise<Tienda | undefined> {
    try {
      const resultado = await fetch(this.url+"/"+id, { method: "GET" })
      const tienda = await resultado.json();
      return tienda;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async putTiendaUsuario(partida: Tienda) {
    try {
      await fetch(`${this.url}/${partida.id}`, {
        method: "PUT",
        body: JSON.stringify(partida),
        headers: { "Content-type": "application/json" }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
