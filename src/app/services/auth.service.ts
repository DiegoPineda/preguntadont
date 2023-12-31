import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session, Usuario } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url: string = 'http://localhost:3200/usuarios'
  private user?: Usuario;


  constructor(private Router:Router, private UsuarioService:UsuarioService, private http:HttpClient) { 

  }




  get currentUser(): Usuario | undefined {
    if (!this.user) return undefined
    return { ...this.user };
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url)
  }

  verificarUserAndPass(email: string, pass: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.getUsers().subscribe(users => {
        const userFound = users.find(u => u.password === pass && u.email === email);
  
        if (userFound) {
          localStorage.setItem('token', userFound.id.toString());
          observer.next(true); // Emite true si el usuario es válido
        } else {
          observer.next(false); // Emite false si el usuario no es válido
        }
        observer.complete();
      });
    });
  }
  

  checkStatusAutenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      return of(false)
    }
    return this.http.get<Usuario>(`${this.url}/${token}`)
      .pipe(
        tap(u => this.user = u),
        map(u => !!u),
        catchError(err => of(false))
      )
  }

  logout() {
    this.user = undefined;
    localStorage.clear()
  }
  

}
