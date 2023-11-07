import { Injectable } from '@angular/core';
import { Partida } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PartidaTerminadaService {

  constructor() { }

  url: string = "http://localhost:3002/partidasTerminadas";

  async getPartidas(): Promise <Partida[] | undefined> {
    try{
      const resultado = await fetch(this.url, {method: "GET"})
      const partidas= resultado.json();
      return partidas;
    }catch(error){
      console.log(error);
    }
    return undefined;
  }
}
