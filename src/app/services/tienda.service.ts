import { Injectable } from '@angular/core';
import { Productos } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor() { }

  url: string = "http://localhost:3003/productos";

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
