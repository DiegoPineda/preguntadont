import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Estadistica, Tienda, Usuario } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private router: Router, private http: HttpClient) { }

  url: string = "http://localhost:3200/usuarios";
  url2: string = "http://localhost:3070/tienda";
  url3: string = "http://localhost:3050/estadisticas";

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
    	console.log("Error en postUsuarioTienda");
    }
  }

  async postUsuarioEstadistica(estadistica : Estadistica){
    try {
      await fetch(this.url3, {
        method: "POST",
        body: JSON.stringify(estadistica),
        headers: {"Content-type" : "application/json"}
      })
    } catch (error) {  
    	console.log("Error en postUsuarioEstadistica");
    }
  }

  async getUsuarios(): Promise <Usuario[] | undefined>{
    try {
      const resultados = await fetch(this.url, {method: 'GET'});
      const usuarios = await resultados.json();
      return usuarios;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async getEstadisticasUsuarios(): Promise <Estadistica[] | undefined>{
    try {
      const resultados = await fetch(this.url3, {method: 'GET'});
      const usuarios = await resultados.json();
      return usuarios;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }
  
  async getUsuario(id: number): Promise <Usuario | undefined>{
    try {
      const resultados = await fetch(`${this.url}/${id}`, {method: 'GET'});
      const usuarios = await resultados.json();
      return usuarios;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async getUsuarioEstadistica (id: number): Promise<Estadistica | undefined>{
    try {
      const resultado = await fetch(this.url3+"/"+id, { method: "GET" })
      const estadistica = resultado.json();
      return estadistica;
    } catch (error) {
      console.log("Error en getUsuarioEstadistica");
    }
    return undefined;
  }

  async putUsuarioEstadistica(estadistica: Estadistica) {
    try {
      await fetch(`${this.url3}/${estadistica.id}`, {
        method: "PUT",
        body: JSON.stringify(estadistica),
        headers: { "Content-type": "application/json" }
      })
    } catch (error) {
      console.log("Error en putUsuarioEstadistica");
    }
  }

}
