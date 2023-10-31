import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlSession:string = 'http://localhost:3004/session';
  usuarios : Usuario[] = [];

  constructor(private Router:Router, private UsuarioService:UsuarioService) { 

  }


  async login(user:string, password:string){
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
  }
  

}
