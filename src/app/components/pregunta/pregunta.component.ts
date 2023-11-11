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

  constructor(
    private preguntaService: PreguntaService,
    private sharingService: SharingService,
    private authService: AuthService,
    private usuarioTiendaService: UsuarioTiendaService
  ) {}

  async ngOnInit() {
    await this.cargarPregunta();
    this.actualizarConsumibles();
    this.sharingService.tiendaUsuario.subscribe((tienda) => {
      this.tiendaUsuario = tienda;
    });
    this.bloquearConsumibles();
    this.cuentaRegresiva();
  }
  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }

  get getUser(): Usuario | undefined {
    return this.authService.currentUser;
  }
  getInfoTienda(id: number): Observable<Tienda | undefined> {
    return this.usuarioTiendaService.getUserTienda(id);
  }

  actualizarConsumibles() {
    this.idActual = this.authService.currentUser?.id;

    if (this.idActual !== undefined) {
      this.getInfoTienda(this.idActual)
        .pipe(
          tap((tienda) => {
            this.tiendaUsuario = tienda;
          }),
          catchError((error) => {
            console.error('Error al obtener los datos de la tienda', error);
            return [];
          })
        )
        .subscribe({
          next: () => this.bloquearConsumibles()
        });
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

  verificarRespuesta(respuestaSeleccionada: string | undefined) {
    if (respuestaSeleccionada === this.pregunta?.respuesta) {
      console.log('¡Respuesta correcta!');
      this.sharingService.enviarResultado(true);
    } else {
      console.log('Respuesta incorrecta. Intenta de nuevo.');
      this.sharingService.enviarResultado(false);
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
        // vuelvo patra preguntar a diego
        this.timerSubscription?.unsubscribe(); 
      }
    });
  }
}
