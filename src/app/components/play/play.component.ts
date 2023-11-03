import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  animations: [
    trigger('spin', [
      transition('* => spin', [ 
        style({ transform: 'rotate(0deg)' }),
        animate('5s cubic-bezier(0.23, 1, 0.32, 1)', style({ transform: 'rotate(7200deg)' })),
      ]),
    ]),
  ],   
})
export class PlayComponent implements OnInit {
  spinState: 'spin' | 'stop' = 'stop';

  constructor() {}

  ngOnInit(): void {}

  spin() {
    this.spinState = 'spin';
    setTimeout(() => {
      this.spinState = 'stop';
      const temaSeleccionado = this.obtenerTemaAleatorio();
      console.log('Tema seleccionado:', temaSeleccionado);
    }, 5000); // El tiempo debe coincidir con la duración de la animación
  }

  obtenerTemaAleatorio() {
    const temas = ['Tema 1', 'Tema 2', 'Tema 3', 'Tema 4']; // Agrega más temas
    const indice = Math.floor(Math.random() * temas.length);
    return temas[indice];
  }
}