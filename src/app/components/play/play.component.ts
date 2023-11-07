import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {
  spinState: 'spin' | 'stop' = 'stop';
  @ViewChild('wheel') wheelRef: ElementRef | undefined; // Cambia el nombre de la propiedad
  currentRotation: number = 0;
  numberOfElements: number = 6; // Número de elementos en la ruleta

  constructor() {}

  girar() {
    if (this.wheelRef) {
      // Simula una rotación aleatoria de la ruleta
      const randomRotation = Math.ceil(Math.random() * 3600);
      this.currentRotation += randomRotation;
      this.wheelRef.nativeElement.style.transform = `rotate(${this.currentRotation}deg`;

      // Calcula el valor al que apunta el "spin" en función de la rotación
      const anglePerElement = 360 / this.numberOfElements;
      const spinValue = Math.floor((this.currentRotation % 360) / anglePerElement) + 1;

      // Utiliza spinValue según tus necesidades
      console.log('El spin apunta al valor:', spinValue);
      switch (spinValue) {
        case 1:
          return "ciencia";
      
        case 2:
          return "entretenimiento";
      
        case 3:
          return "arte";
      
        case 4:
          return "geografía";
      
        case 5:
          return "historia";
      
        case 6:
          return "deportes";
      
        default:
          return "valor no reconocido";
      }
    }else{
      return "valor no reconocido";
    }
    

  }
  }





