import { Injectable } from '@angular/core';
import { Partida } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  listaPartidas: Partida[] | undefined;
  

  constructor() { }

  url: string = "http://localhost:3002/partidas";

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
  

  async postPartida(partida : Partida){
    try {
      await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(partida),
        headers: {"Content-type" : "application/json"}
      })
    } catch (error) {  
    	console.log(error);
    }
  }

  async putPartida(partida: Partida){
    try {
      await fetch(`${this.url}/${partida.id}`,{
        method: "PUT",
        body: JSON.stringify(partida),
        headers: {"Content-type" : "application/json"}
      })
    } catch (error) {
      console.log(error);
    }
  }

  async buscarPartida(partida:Partida): Promise <Partida | undefined>{
    try{
      this.listaPartidas = await this.getPartidas();
      const partidaEncontrada = this.listaPartidas?.find((e) => e.uuid === partida.uuid);
      return partidaEncontrada;
    }catch(err){
      console.log(err);
      return undefined;
    }
  } 
}
