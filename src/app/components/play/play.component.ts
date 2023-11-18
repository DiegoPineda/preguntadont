import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent {
  spinState: 'spin' | 'stop' = 'stop';
  @ViewChild('wheel') wheelRef: ElementRef | undefined; // Cambia el nombre de la propiedad
  currentRotation: number = 0;
  numberOfElements: number = 6; // Número de elementos en la ruleta
  divHabilitado= true;

   @Output() spinClick: EventEmitter<any> = new EventEmitter();

  constructor(private sharingService: SharingService) { }

  girar() {
    if (this.wheelRef) {
      this.divHabilitado = false;
      // Simula una rotación aleatoria de la ruleta
      const randomRotation = Math.ceil(Math.random()*3600);
      this.currentRotation += randomRotation;
      this.wheelRef.nativeElement.style.transform = `rotate(${this.currentRotation}deg`;

      // Calcula el valor al que apunta el "spin" en función de la rotación
      const anglePerElement = 360 / this.numberOfElements;
      const spinValue =
        Math.floor((this.currentRotation % 360) / anglePerElement) + 1;

      // Utiliza spinValue según tus necesidades
      let result = '';
      switch (spinValue) {
        case 1:
          result = 'Ciencia';
          break;
        case 2:
          result = 'Entretenimiento';
          break;
        case 3:
          result = 'Arte';
          break;
        case 4:
          result = 'Geografía';
          break;
        case 5:
          result = 'Historia';
          break;
        case 6:
          result = 'Deportes';
          break;
        default:
          result = 'valor no reconocido';
          break;
      }

        setTimeout(() => {
          this.sharingService.enviarCategoriaSpin(result);
          this.divHabilitado = true;
        }, (this.currentRotation + 4000));
      } 
    }
  }
