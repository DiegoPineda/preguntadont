import { Component, ViewChild } from '@angular/core';
import { Partida, Pregunta, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PartidaService } from 'src/app/services/partida-proceso.service';
import { PlayComponent } from '../play/play.component';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { PreguntaComponent } from '../pregunta/pregunta.component';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
})
export class PartidaComponent {
  contador:number = 0;
  listaPartidas: Partida[] | undefined = [];
  pregunta: Pregunta | undefined;
  usuario: Usuario | undefined;
  partida: Partida  = {
    id: 0,
    idUsuario1: 0,
    idUsuario2: 0,
    aciertosUsuario1: 0,
    aciertosUsuario2: 0,
    usuarioFinalizo1: false,
    usuarioFinalizo2: false,
    uuid: this.getUniqueId(4),
  }

  @ViewChild('preguntaComponent') preguntaComponent:
    | PreguntaComponent
    | undefined;
  @ViewChild(PlayComponent) playComponent!: PlayComponent;

  ngAfterViewInit() {
    this.playComponent.spinClick.subscribe((resultado: string) => {
      this.cargarPregunta(resultado);
    });
    this.preguntaComponent?.inputClicked.subscribe((respuesta: string) => {
      this.validarRespuesta(respuesta);
      this.partidaService.putPartida(this.partida);
      if(this.contador<10){
        this.contador++;
        this.toggleComponents();
      }
    });
  }

  constructor(
    private partidaService: PartidaService,
    private auth: AuthService,
    private preguntaServise: PreguntaService
  ) {}

  mostrarPlayClass = false;
  mostrarPreguntaClass = true;

  async ngOnInit() {
    this.usuario = this.auth.currentUser;
    await this.crearPartida();
    if (this.partida !== undefined) {
      this.iniciarPartida(this.partida);
    }
  }

  async iniciarPartida(partida: Partida) {
        /*  this.listaPartidas = await this.partidaService.getPartidas();
  
    for (const e of this.listaPartidas || []) {
      if (e && e.idUsuario1 !== this.usuario?.id) {
        if (this.usuario?.id !== undefined) {
          e.idUsuario2 = this.usuario.id;
          e.usuarioFinalizo2=true;
          // unirme a la partida
          this.partidaService.putPartida(e);
          return e;
        }
        return undefined;
      }
    }
  
    if (this.usuario?.id !== undefined) {
      this.partida.idUsuario1 = this.usuario?.id;
      this.partida.usuarioFinalizo1=true;
      this.partidaService.postPartida(this.partida);
      return this.partidaService.buscarPartida(this.partida);
    } else {
      return undefined;
    } */
  }

  async crearPartida(){
    this.listaPartidas = await this.partidaService.getPartidas();
  
    for (const e of this.listaPartidas || []) {
      if (e && e.idUsuario1 !== this.usuario?.id) {
        if (this.usuario?.id !== undefined) {
          this.partida=e;
          this.partida.idUsuario2=this.usuario.id;
          this.partida.usuarioFinalizo2=true;

          this.partidaService.putPartida(this.partida);
        }
      }
    }

    if (this.usuario !== undefined) {
      this.partida.idUsuario1 = this.usuario.id;
      this.partida.usuarioFinalizo1=true;
      this.partidaService.postPartida(this.partida);
      const partidaBuscada = await this.partidaService.buscarPartida(this.partida);
      if(partidaBuscada !== undefined){
        this.partida = partidaBuscada;
      }
    }
  }



  validarRespuesta(respuesta: string) {
    if (this.partida?.idUsuario1 === this.usuario?.id) {
      if (
        this.pregunta?.respuesta === respuesta &&
        this.partida !== undefined
      ) {
        console.log('HOLA');
        this.partida.aciertosUsuario1++;
        this.partidaService.putPartida(this.partida);
      }
    }
    if (this.partida?.idUsuario2 === this.usuario?.id) {
      if (
        this.pregunta?.respuesta === respuesta &&
        this.partida !== undefined
      ) {
        this.partida.aciertosUsuario2++;
      }
    }
  }

  async cargarPregunta(categoria: string) {
    this.pregunta = await this.preguntaServise.preguntaAleatoria(categoria);
    console.log(this.preguntaComponent);
    if (this.preguntaComponent && this.pregunta) {
      this.preguntaComponent.enunciado = this.pregunta.enunciado;
      this.preguntaComponent.valoresPreguntas = this.pregunta.opciones;
      this.toggleComponents();
    }
  }

  toggleComponents() {
    this.mostrarPlayClass = !this.mostrarPlayClass;
    this.mostrarPreguntaClass = !this.mostrarPreguntaClass;
  }

  getUniqueId(parts: number): string {
    const stringArr = [];
    for (let i = 0; i < parts; i++) {
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0)
        .toString(16)
        .substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}
