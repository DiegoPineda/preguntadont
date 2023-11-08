import { Component, ViewChild } from '@angular/core';
import { Partida, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PartidaService } from 'src/app/services/partida-proceso.service';
import { PlayComponent } from '../play/play.component';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { PreguntaComponent } from '../pregunta/pregunta.component';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent {

  listaPartidas: Partida[] | undefined = [];
  usuario: Usuario | undefined;
  partida:Partida | undefined;

  @ViewChild('preguntaComponent') preguntaComponent:PreguntaComponent | undefined;
  @ViewChild(PlayComponent) playComponent!: PlayComponent;

  ngAfterViewInit() {
    this.playComponent.spinClick.subscribe((resultado: string) => {
      this.cargarPregunta(resultado); 
    });
    this.preguntaComponent?.inputClicked.subscribe((respuesta: string) => {
      
      // Realizar otras acciones con la respuesta aquí
    });
  }

  

  

  constructor(
    private partidaService: PartidaService,
    private auth: AuthService,
    private pregunta:PreguntaService) { }

    mostrarPlayClass = false;
    mostrarPreguntaClass = true;


  async ngOnInit() {
    this.usuario = this.auth.currentUser;
    this.partida = await this.crearPartida();
    if(this.partida !== undefined){
      this.iniciarPartida(this.partida);
    }

  }

  iniciarPartida(partida:Partida){
    
  }

   async cargarPregunta(categoria:string){
    const pregunta = await this.pregunta.preguntaAleatoria(categoria);
    console.log(this.preguntaComponent);
    if(this.preguntaComponent && pregunta){
      this.preguntaComponent.enunciado=pregunta.enunciado;
      this.preguntaComponent.valoresPreguntas = pregunta.opciones;
      this.toggleComponents();
    }
  }

  toggleComponents() {
    this.mostrarPlayClass = !this.mostrarPlayClass;
    this.mostrarPreguntaClass = !this.mostrarPreguntaClass;
  }

  async crearPartida():Promise<Partida | undefined> {
    const partida: Partida = {
      id: 0,
      idUsuario1: 0,
      idUsuario2: 0,
      aciertosUsuario1: 0,
      aciertosUsuario2: 0,
      usuarioFinalizo1: false,
      usuarioFinalizo2: false
    }
  
    this.listaPartidas = await this.partidaService.getPartidas();
  
    for (const e of this.listaPartidas || []) {
      if (e && e.idUsuario1 !== this.usuario?.id) {
        if (this.usuario?.id !== undefined) {
          e.idUsuario2 = this.usuario.id;
          // unirme a la partida
          this.partidaService.putPartida(e);
          return e;
        }
        return undefined;
      }
    }
  
    if (this.usuario?.id !== undefined) {
      partida.idUsuario1 = this.usuario?.id;
      this.partidaService.postPartida(partida);
      return partida;
    } else {
      return undefined;
    }
  }

}



