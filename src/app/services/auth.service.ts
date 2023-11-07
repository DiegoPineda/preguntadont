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

/*   urlSession:string = 'http://localhost:3004/session';
  usuarios : Usuario[] = []; */

  private url: string = 'http://localhost:3000/usuarios'
  private user?: Usuario;


  constructor(private Router:Router, private UsuarioService:UsuarioService, private http:HttpClient) { 

  }


 /*  async login(user:string, password:string){
    try{
      const usuarios = await this.UsuarioService.getUsuarios();
      if(Array.isArray(usuarios)){
        usuarios.forEach((e: Usuario) => {
          if(e.email === user && e.password===password){
            const session :Session = {
              userId:e.id
            } 
            this.postSession(session);
            this.Router.navigate(['/home']);
          }
        })
      }
    }catch(error){
      console.log(error);
    }
    
  }


  async postSession(session:Session){
    try{
      await fetch(this.urlSession, {
        method: 'POST',
        body: JSON.stringify(session),
        headers: {"Content-type" : "application/json"}
      })
    }catch(error){
      console.log(error);
    }
  } */



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
