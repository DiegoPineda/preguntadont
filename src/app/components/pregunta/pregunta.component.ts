import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent {
  
  @Input() valoresPreguntas: string[] = [];
  @Input() enunciado: string = '';
  @Output() inputClicked: EventEmitter<string> = new EventEmitter<string>();
  constructor(){

  }

  onInputClick(value: string) {
    this.inputClicked.emit(value);
  }


}
