import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private router: Router) { }

  url: string = "http://localhost:4000/usuarios";

  async postUsuario(cita : Usuario){
    try {
      await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(cita),
        headers: {"Content-type" : "application/json"}
      })
      this.router.navigate(["home"]);
    } catch (error) {  
    	console.log(error);
    }
  }
  
}
