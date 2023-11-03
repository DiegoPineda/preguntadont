import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tienda } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioTiendaService {

  constructor(private http:HttpClient) { }

  getUserTienda(userId: number): Observable<Tienda> {
    return this.http.get<Tienda>(`http://localhost:3000/tienda/${userId}`);
  }
}
