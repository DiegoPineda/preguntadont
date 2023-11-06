import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {
  spinState: 'spin' | 'stop' = 'stop';
  @ViewChild('wheel') wheelRef: ElementRef | undefined; // Cambia el nombre de la propiedad
  value: number = Math.ceil(Math.random() * 3600);

  constructor() {}

  girar() {
    if (this.wheelRef) {
      this.wheelRef.nativeElement.style.transform = `rotate(${this.value}deg)`;
      this.value += Math.ceil(Math.random() * 3600);
    }
  }
}




