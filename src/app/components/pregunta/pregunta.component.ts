import { Component } from '@angular/core';
import { Pregunta } from 'src/app/interfaces/interfaces';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaComponent {
  enunciado: string | undefined;
  valores: string[] | undefined;
  pregunta: Pregunta | undefined;
  categoria:string = '';

  constructor(private preguntaService: PreguntaService, private sharingService:SharingService) {}


  async ngOnInit() {
    await this.cargarPregunta();
  }

  async cargarPregunta() {
    this.sharingService.categoria.subscribe(async (categoria) => {
      if (categoria && typeof categoria ==="string") {
        this.categoria = categoria;
        this.pregunta = await this.preguntaService.preguntaAleatoria(this.categoria);
        this.enunciado = this.pregunta?.enunciado;
        this.valores = this.pregunta?.opciones;
        
      }
    });
  }


  verificarRespuesta(respuestaSeleccionada: string | undefined) {
    // Verifica si la respuesta seleccionada es la correcta
    if (respuestaSeleccionada === this.pregunta?.respuesta) {
      console.log('¡Respuesta correcta!');
      this.sharingService.enviarResultado(true);
    } else {
      console.log('Respuesta incorrecta. Intenta de nuevo.');
      this.sharingService.enviarResultado(false);
    }
  }



  
}
