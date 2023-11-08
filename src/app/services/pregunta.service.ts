import { Injectable } from '@angular/core';
import { Pregunta } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  url:string = 'http://localhost:3001/preguntas';
  listaPreguntas: Pregunta[] |undefined;

  constructor() { }

  async getPreguntas(): Promise <Pregunta[] | undefined>{
    try {
      const resultados = await fetch(this.url, {method: 'GET'});
      const preguntas= await resultados.json();
      return preguntas;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async preguntaAleatoria(categoria: string): Promise<Pregunta | undefined> {
    this.listaPreguntas = await this.getPreguntas();
  
    if (this.listaPreguntas && this.listaPreguntas.length > 0) {
      const preguntasCategoria = this.listaPreguntas.filter(pregunta => pregunta.categoria === categoria);
  
      if (preguntasCategoria.length > 0) {
        const indexAleatorio = Math.floor(Math.random() * preguntasCategoria.length);
        return { ...preguntasCategoria[indexAleatorio] };
      }
    }
    
    return undefined;
  }
}
