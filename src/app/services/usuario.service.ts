import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Estadistica, Tienda, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private router: Router) { }

  url: string = "http://localhost:4000/usuarios";
  url2: string = "http://localhost:4000/tienda";
  url3: string = "http://localhost:4000/estadisticas";

  async postUsuario(usuario : Usuario){
    try {
      await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {"Content-type" : "application/json"}
      })
    } catch (error) {  
    	console.log(error);
    }
  }

  async postUsuarioTienda(tienda : Tienda){
    try {
      await fetch(this.url2, {
        method: "POST",
        body: JSON.stringify(tienda),
        headers: {"Content-type" : "application/json"}
      })
    } catch (error) {  
    	console.log(error);
    }
  }

  async postUsuarioEstadistica(estadistica : Estadistica){
    try {
      await fetch(this.url3, {
        method: "POST",
        body: JSON.stringify(estadistica),
        headers: {"Content-type" : "application/json"}
      })
      this.router.navigate(["login"]);
    } catch (error) {  
    	console.log(error);
    }
  }

  async getUsuarios(): Promise <Usuario | undefined>{
    try {
      const resultados = await fetch(this.url, {method: 'GET'});
      const usuarios = await resultados.json();
      return usuarios;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }



  /* async getUsuarios(email: string, password:string): Promise <Usuario | undefined> {
    try{
      const resultado = await fetch(this.url+"?${email}=${"+email+"}", {method: "GET"})
      const citas= resultado.json();
      if(citas.password==password)
      {
        return citas;
      }
      
    }catch(error){
      console.log(error);
    }
    return undefined;
  } */
  
}
