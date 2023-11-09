import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() inputClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private preguntaService: PreguntaService, private sharingService:SharingService) {}


  onInputClick(value: string) {
    this.inputClicked.emit(value);
  }

  async ngOnInit() {
    
    
    await this.cargarPregunta();
  }

  async cargarPregunta() {
    this.sharingService.categoria.subscribe(async (categoria) => {
      if (categoria) {
        this.categoria = categoria;
        this.pregunta = await this.preguntaService.preguntaAleatoria(this.categoria);
        this.enunciado = this.pregunta?.enunciado;
        this.valores = this.pregunta?.opciones;
      }
    });
  }
  
}
