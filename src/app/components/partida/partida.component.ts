import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Estadistica, Partida, Usuario, Tienda } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PartidaService } from 'src/app/services/partida.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UsuarioTiendaService } from 'src/app/services/usuario-tienda.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css'],
})
export class PartidaComponent {
  listaPartidas: Partida[] | undefined = [];
  pregunta: boolean | undefined;
  usuario: Usuario | undefined;
  categoria: string | null = "";



  partida: Partida = {
    id: "",
    idUsuario1: 0,
    idUsuario2: 0,
    aciertosUsuario1: 0,
    aciertosUsuario2: 0,
    usuarioFinalizo1: false,
    usuarioFinalizo2: false,
    contadorUsuario1: 0,
    contadorUsuario2: 0,
    amigo: false
  }

  estadistica: Estadistica = {
    id: 0,
    puntos: 0,
    partidasGanadas: 0,
    partidasPerdidas: 0,
    partidasEmpatadas: 0,
    aciertosArte: 0,
    totalArte: 0,
    aciertosCiencia: 0,
    totalCiencia: 0,
    aciertosDeporte: 0,
    totalDeporte: 0,
    aciertosEntretenimiento: 0,
    totalEntretenimiento: 0,
    aciertosGeografia: 0,
    totalGeografia: 0,
    aciertosHistoria: 0,
    totalHistoria: 0,
  }





  constructor(
    private partidaService: PartidaService,
    private auth: AuthService,
    private sharingService: SharingService,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private router: Router,
    private usuarioTienda: UsuarioTiendaService
  ) { }

  mostrarPlay = false;
  mostrarPregunta = false;

  ngOnInit() {
    this.iniciarPartida();
  }






  async iniciarPartida() {

    this.usuario = await this.auth.currentUser;

    //consigo las estadisticas del usuario
    if (this.usuario?.id !== undefined) {
      let est = await this.usuarioService.getUsuarioEstadistica(this.usuario?.id);
      if (est !== undefined) {
        this.estadistica = est;
      }
    }

    //consigo el id de la url
    let partidaId;
    this.route.params.subscribe(params => {
      partidaId = params['id'];
      console.log(partidaId);
    });


    //busco la partida en base al id
    if (partidaId != undefined) {
      let part = await this.partidaService.getPartida(partidaId);
      if (part) {
        this.partida = part;
      }
    }


    if ((this.usuario?.id === this.partida.idUsuario1) || (this.usuario?.id === this.partida.idUsuario2)) {
      if (this.usuario.id == this.partida.idUsuario1 && this.partida.usuarioFinalizo1 == true) {
        this.router.navigate(["/home"]);
      } else if (this.usuario.id == this.partida.idUsuario2 && this.partida.usuarioFinalizo2 == true) {
        this.router.navigate(["/home"]);
      } else {
        //ACA VA LA LOGICA
        //usuario1
        if (this.usuario.id === this.partida.idUsuario1) {
          // Lógica para el usuario 1


          while (this.partida.contadorUsuario1 < 5) {

            this.mostrarPlay = true;
            //recibo la categoria del spin
            const valorRecibido = await new Promise<string | null>((resolve) => {
              let sub: Subscription;
              sub = this.sharingService.recibirCategoriaSpin.subscribe((valor) => {
                if (sub) {
                  sub.unsubscribe();
                  this.categoria = valor;
                  resolve(valor);
                }
              });
            });


            this.mostrarPlay = false;
            console.log(this.categoria);

            //aumentar 1 a los errores del usuario en la categoria y hacer put
            this.forzarError();
            await this.usuarioService.putUsuarioEstadistica(this.estadistica);

            //hacer un put del contador de usuario
            this.partida.contadorUsuario1++;
            await this.partidaService.putPartida(this.partida);

            this.mostrarPregunta = true;
            if (this.categoria != null) {
              this.sharingService.enviarCategoria(this.categoria);
            }

          
            //recibo true o false de preguntas
            const respuestaPregunta = await new Promise<boolean | null>((resolve) => {
              let sub: Subscription;
              sub = this.sharingService.recibirResultado.subscribe((valor) => {
                if (sub) {
                  sub.unsubscribe();
                  if (valor != null) {
                    this.pregunta = valor;
                  }
                  resolve(valor);
                }
              });
            });

            this.mostrarPregunta = false;

            //put en base a verdadero o falso 
            
            await this.usuarioService.putUsuarioEstadistica(this.estadistica);
            if (this.pregunta == true) {
              this.arreglarError();
              this.partida.aciertosUsuario1++;
              await this.partidaService.putPartida(this.partida);
            }
          }
          if (this.partida.contadorUsuario1 == 5) {
            this.partida.usuarioFinalizo1 = true;
            await this.partidaService.putPartida(this.partida);
            alert("Gracias por jugar!")

          }
          this.partidaTermino();

          this.router.navigate(["/home"]);
        } else {//usuario2

          while (this.partida.contadorUsuario2 < 5) {

            this.mostrarPlay = true;
            //
            const valorRecibido = await new Promise<string | null>((resolve) => {
              let sub: Subscription;
              sub = this.sharingService.recibirCategoriaSpin.subscribe((valor) => {
                if (sub) {
                  sub.unsubscribe();
                  this.categoria = valor;
                  resolve(valor);
                }
              });
            });
            this.mostrarPlay = false;
            console.log(this.categoria);

            this.mostrarPregunta = true;
//aumentar 1 a los errores del usuario en la categoria y hacer put
this.forzarError();
await this.usuarioService.putUsuarioEstadistica(this.estadistica);

//hacer un put del contador de usuario
this.partida.contadorUsuario2++;
await this.partidaService.putPartida(this.partida);

            if (this.categoria != null) {
              this.sharingService.enviarCategoria(this.categoria);
            }

            

            //recibo true o false de preguntas
            const respuestaPregunta = await new Promise<boolean | null>((resolve) => {
              let sub: Subscription;
              sub = this.sharingService.recibirResultado.subscribe((valor) => {
                if (sub) {
                  sub.unsubscribe();
                  if (valor != null) {
                    this.pregunta = valor;
                  }
                  resolve(valor);
                }
              });
            });

            this.mostrarPregunta = false;

            //put en base a verdadero o falso 
            
            await this.usuarioService.putUsuarioEstadistica(this.estadistica);
            if (this.pregunta == true) {
              this.arreglarError();
              this.partida.aciertosUsuario2++; 
              await this.partidaService.putPartida(this.partida);
            }
          }
          if (this.partida.contadorUsuario2 == 5) {
            this.partida.usuarioFinalizo2 = true;
           await this.partidaService.putPartida(this.partida);
            alert("Gracias por jugar!")
          }
          await this.partidaTermino();


          this.router.navigate(["/home"]);


        }
      }

    } else {
      this.router.navigate(["/home"]);
    }


  }

  async partidaTermino() {
    if (this.partida.contadorUsuario1 == 5 && this.partida.contadorUsuario2 == 5) {
      let monedasUsuario1 = await this.usuarioTienda.getUserTienda2(this.partida.idUsuario1);
      const monedasUsuario2 = await this.usuarioTienda.getUserTienda2(this.partida.idUsuario2);

      let estUsuario1 = await this.usuarioService.getUsuarioEstadistica(this.partida.idUsuario1);
      let estUsuario2 = await this.usuarioService.getUsuarioEstadistica(this.partida.idUsuario2);

      await this.partidaService.postPartidaTerminada(this.partida);
      await this.partidaService.deletePartida(this.partida.id);
      if (this.partida.aciertosUsuario1 > this.partida.aciertosUsuario2) {
        if (estUsuario1 && estUsuario2 && monedasUsuario2 && monedasUsuario1) {
          estUsuario1.partidasGanadas++;
          estUsuario1.puntos += 3;
          monedasUsuario1.monedas += 7;

          estUsuario2.partidasPerdidas++;
        }
      } else if (this.partida.aciertosUsuario1 < this.partida.aciertosUsuario2) {
        if (estUsuario1 && estUsuario2 && monedasUsuario2 && monedasUsuario1) {
          estUsuario2.partidasGanadas++;
          estUsuario2.puntos += 3;
          monedasUsuario2.monedas += 7;

          estUsuario1.partidasPerdidas++;
        }
      } else {
        if (estUsuario1 && estUsuario2 && monedasUsuario2 && monedasUsuario1) {
          estUsuario2.partidasEmpatadas++;
          estUsuario1.partidasEmpatadas++;
          estUsuario1.puntos += 1;
          estUsuario2.puntos += 1;
          monedasUsuario1.monedas += 4;
          monedasUsuario2.monedas += 4;
        }
      }
      if (estUsuario1) { await this.usuarioService.putUsuarioEstadistica(estUsuario1); }
      if (estUsuario2) { await this.usuarioService.putUsuarioEstadistica(estUsuario2); }
      if (monedasUsuario1) { await this.usuarioTienda.putTiendaUsuario(monedasUsuario1); }
      if (monedasUsuario2) { await this.usuarioTienda.putTiendaUsuario(monedasUsuario2); }

    }
  }

  forzarError() {
    switch (this.categoria) {
      case "Entretenimiento":
        this.estadistica.totalEntretenimiento++;
        break;
      case "Arte":
        this.estadistica.totalArte++;
        break;
      case "Geografía":
        this.estadistica.totalGeografia++;
        break;
      case "Historia":
        this.estadistica.totalHistoria++;
        break;
      case "Deportes":
        this.estadistica.totalDeporte++;
        break;
      case "Ciencia":
        this.estadistica.totalCiencia++;
        break;
    }
  }

  arreglarError() {
    switch (this.categoria) {
      case "Entretenimiento":
        this.estadistica.aciertosEntretenimiento++;
        break;
      case "Arte":
        this.estadistica.aciertosArte++;
        break;
      case "Geografía":
        this.estadistica.aciertosGeografia++;
        break;
      case "Historia":
        this.estadistica.aciertosHistoria++;
        break;
      case "Deportes":
        this.estadistica.aciertosDeporte++;
        break;
      case "Ciencia":
        this.estadistica.aciertosCiencia++;
        break;
    }
    this.usuarioService.putUsuarioEstadistica(this.estadistica);
  }
}
