import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})


export class HomePageComponent {
  mostrarJugar: boolean = true;
  mostrarTienda: boolean = false;
  mostrarEstadisticas: boolean = false;

  mostrar(componente: string) {
    this.mostrarJugar = false;
    this.mostrarTienda = false;
    this.mostrarEstadisticas = false;

    switch (componente) {
      case 'jugar':
        this.mostrarJugar = true;
        break;
      case 'tienda':
        this.mostrarTienda = true;
        break;
      case 'estadisticas':
        this.mostrarEstadisticas = true;
        break;
      default:
        break;
    }
  }
}
