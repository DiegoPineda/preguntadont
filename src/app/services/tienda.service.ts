import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private router: Router) { }

  url: string = "http://localhost:3000/productos";

  async getProductos(): Promise <Productos[] | undefined> {
    try{
      const resultado = await fetch(this.url, {method: "GET"})
      const productos= resultado.json();
      return productos;
    }catch(error){
      console.log(error);
    }
    return undefined;
  }
}
