import { Component } from '@angular/core';
import { Pregunta, Tienda, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PreguntaService } from 'src/app/services/pregunta.service';
import { SharingService } from 'src/app/services/sharing.service';
import { Observable, Subscription, catchError, interval, tap } from 'rxjs';
import { UsuarioTiendaService } from 'src/app/services/usuario-tienda.service';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaComponent {
  enunciado: string | undefined;
  valores: string[] | undefined;
  pregunta: Pregunta | undefined;
  categoria: string = '';

  idActual: number | undefined;
  tiendaUsuario: Tienda | undefined;

  respuestasBloqueadas = new Set<string | undefined>();
  bombaBloqueado = true;
  conejoBloqueado = true;
  relojBloqueado = true;

  bombaUsada = false;
  conejoUsado = false;
  relojUsado = false;

  timer:number=10;
  timerSubscription: Subscription | undefined;

  rtaCorrecta: number = -1;
  rtaIncorrecta: number = -1;

  constructor(
    private preguntaService: PreguntaService,
    private sharingService: SharingService,
    private authService: AuthService,
    private usuarioTiendaService: UsuarioTiendaService
  ) {}

  async ngOnInit() {
    await this.cargarPregunta();
    await this.actualizarConsumibles();
    this.bloquearConsumibles();
    this.cuentaRegresiva();
  }
  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }

  get getUser(): Usuario | undefined {
    return this.authService.currentUser;
  }
  getInfoTienda(id: number): Promise<Tienda | undefined> {
    return this.usuarioTiendaService.getUserTienda2(id);
  }

  async actualizarConsumibles() {
    this.idActual = this.authService.currentUser?.id;
  
    if (this.idActual !== undefined) {
      try {
        const tienda = await this.getInfoTienda(this.idActual);
  
        if (tienda !== undefined) {
          this.tiendaUsuario = tienda;
          this.bloquearConsumibles();
        }
      } catch (error) {
        console.error('Error al obtener los datos de la tienda', error);
      }
    }
  }

  async cargarPregunta() {
    this.sharingService.categoria.subscribe(async (categoria) => {
      if (categoria && typeof categoria === 'string') {
        this.categoria = categoria;
        this.pregunta = await this.preguntaService.preguntaAleatoria(
          this.categoria
        );
        this.enunciado = this.pregunta?.enunciado;
        this.valores = this.pregunta?.opciones;
      }
    });
  }

  verificarRespuesta(respuestaSeleccionada: string | undefined, indice:number) {
    this.timerSubscription?.unsubscribe();
    if (respuestaSeleccionada === this.pregunta?.respuesta) {
      console.log('¡Respuesta correcta!');
      this.rtaCorrecta = indice;
      setTimeout(()=> {
        this.sharingService.enviarResultado(true);
      }, 2000)
    } else {
      console.log('Respuesta incorrecta. Intenta de nuevo.');
      this.rtaIncorrecta = indice;
      setTimeout(()=> {
        this.sharingService.enviarResultado(false);
      }, 2000)
    }
  }

  saltarPregunta() {
    if (this.tiendaUsuario !== undefined && this.tiendaUsuario.cantConejos>0 && this.conejoUsado===false) {
      const conejitos = this.tiendaUsuario.cantConejos - 1;
      this.tiendaUsuario.cantConejos = conejitos;
      
      this.usuarioTiendaService.updateUserTienda(this.tiendaUsuario)
      this.sharingService.updateTiendaUsuario(this.tiendaUsuario);
      this.conejoUsado=true;
      this.cargarPregunta();
    }
  }

  bloquearPregunta(){
    if (this.tiendaUsuario !== undefined && this.tiendaUsuario.cantBombas>0 && this.bombaUsada===false) {
      const bombas = this.tiendaUsuario.cantBombas - 1;
      this.tiendaUsuario.cantBombas = bombas;
      this.respuestasBloqueadas.add(this.retornaFalsa()); 
      this.bombaUsada=true;
      this.usuarioTiendaService.updateUserTienda(this.tiendaUsuario)
      this.sharingService.updateTiendaUsuario(this.tiendaUsuario);
    }
  }

  retornaFalsa():string|undefined{
    const incorrectas = this.valores?.filter((e) => e!=this.pregunta?.respuesta)
    if(incorrectas !== undefined){
      const bombardeada = incorrectas[Math.floor(Math.random() * incorrectas.length)]
      return bombardeada;
    }
    return undefined;
  }

  aumentarTimer(){
    if (this.tiendaUsuario !== undefined && this.tiendaUsuario.cantRelojes>0 && this.relojUsado===false) {
      const relojes = this.tiendaUsuario.cantRelojes - 1;
      this.tiendaUsuario.cantRelojes = relojes;
      this.timer+=5;
      this.relojUsado=true;
      this.usuarioTiendaService.updateUserTienda(this.tiendaUsuario)
      this.sharingService.updateTiendaUsuario(this.tiendaUsuario);
    }
  }



  
  bloquearConsumibles() {
    if (this.tiendaUsuario !== null && this.tiendaUsuario !== undefined) {
      if (this.tiendaUsuario.cantBombas > 0) {
        this.bombaBloqueado = false;
      }
      if (this.tiendaUsuario.cantConejos > 0) {
        this.conejoBloqueado = false;
      }
      if (this.tiendaUsuario.cantRelojes > 0) {
        this.relojBloqueado = false;
      }
    }
  }
  
  cuentaRegresiva() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.timerSubscription?.unsubscribe(); 
        this.sharingService.enviarResultado(false);
      }
    });
  }
}
