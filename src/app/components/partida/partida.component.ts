import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, first } from 'rxjs';
import { Estadistica, Partida, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PartidaService } from 'src/app/services/partida.service';
import { SharingService } from 'src/app/services/sharing.service';
import { PlayComponent } from '../play/play.component';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    private router:Router
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
        alert("No tenes nada que hacer aca compa1");
      } else if (this.usuario.id == this.partida.idUsuario2 && this.partida.usuarioFinalizo2 == true) {
        alert("No tenes nada que hacer aca compa2");
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

            this.mostrarPregunta = true;
            if (this.categoria != null) {
              this.sharingService.enviarCategoria(this.categoria);
            }

            //aumentar 1 a los errores del usuario en la categoria y hacer put
            this.forzarError();
            this.usuarioService.putUsuarioEstadistica(this.estadistica);

            //hacer un put del contador de usuario
            this.partida.contadorUsuario1++;
            this.partidaService.putPartida(this.partida);

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
            this.arreglarError();
            this.usuarioService.putUsuarioEstadistica(this.estadistica);
            if (this.pregunta == true) {
              this.partida.aciertosUsuario1++;
              this.partidaService.putPartida(this.partida);
            }
          }
          if(this.partida.contadorUsuario1==5 && this.partida.contadorUsuario2 ==5){
            this.partidaService.postPartidaTerminada(this.partida);
            this.partidaService.deletePartida(this.partida.id);
          }
          if(this.partida.contadorUsuario1==5){
            alert("Gracias por jugar!")
            this.router.navigate(["/home"]);
          }
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
            if (this.categoria != null) {
              this.sharingService.enviarCategoria(this.categoria);
            }

            //aumentar 1 a los errores del usuario en la categoria y hacer put
            this.forzarError();
            this.usuarioService.putUsuarioEstadistica(this.estadistica);

            //hacer un put del contador de usuario
            this.partida.contadorUsuario2++;
            this.partidaService.putPartida(this.partida);

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
            this.arreglarError();
            this.usuarioService.putUsuarioEstadistica(this.estadistica);
            if (this.pregunta == true) {
              this.partida.aciertosUsuario2++;
              this.partidaService.putPartida(this.partida);
            }
          }
          if(this.partida.contadorUsuario1==5 && this.partida.contadorUsuario2 ==5){
            this.partidaService.postPartidaTerminada(this.partida);
            this.partidaService.deletePartida(this.partida.id);
          }
          if(this.partida.contadorUsuario2==5){
            alert("Gracias por jugar!")
            this.router.navigate(["/home"]);
          }



        }
      }

    } else {
      alert("No tenes nada que hacer aca compa3")
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
  }
}
