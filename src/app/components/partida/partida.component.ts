import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, first} from 'rxjs';
import { Partida, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PartidaService } from 'src/app/services/partida.service';
import { SharingService } from 'src/app/services/sharing.service';
import { PlayComponent } from '../play/play.component';

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

  constructor(
    private partidaService: PartidaService,
    private auth: AuthService,
    private sharingService: SharingService,
    private route: ActivatedRoute
  ) { }

  mostrarPlay = false;
  mostrarPregunta = false;

  ngOnInit() {
    this.iniciarPartida();
  }


 



  async iniciarPartida() {

    this.usuario = await this.auth.currentUser;

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

    console.log("id usuario conectado " + this.usuario?.id);
    console.log("partida idusuario1 " + this.partida.idUsuario1);
    console.log("partida idusuario2 " + this.partida.idUsuario2);
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


          while (this.partida.contadorUsuario1 < 10) {
            this.mostrarPlay = true;

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

            this.mostrarPregunta=true;
            if(this.categoria!=null){
              this.sharingService.enviarCategoria(this.categoria);
            }
            //aumentar 1 a los errores del usuario en la categoria y hacer put
            this.partida.contadorUsuario1++;
            //hacer un put del contador de usuario

            const respuestaPregunta = await new Promise<boolean | null>((resolve) => {
              let sub: Subscription;
              sub = this.sharingService.recibirResultado.subscribe((valor) => {
                if (sub) {
                  sub.unsubscribe();
                  if(valor !=null){
                    this.pregunta = valor;
                  }
                  resolve(valor);
                }
              });
            });
            this.mostrarPregunta=false;
            //put en base a verdadero o falso 
            console.log(this.pregunta);
            

            console.log("iteracion " + this.partida.contadorUsuario1);

          }
          console.log("esta es la categoria " + this.categoria);
        } else {//usuario2

        }
      }

    } else {
      alert("No tenes nada que hacer aca compa3")
    }


  }
}






/*   validarRespuesta(respuesta: string) {
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
  } */

/*   cargarPregunta(categoria: string) {
    if (this.preguntaComponent) {
      this.sharingService.enviarCategoria(categoria);
      //this.enviarCategoria.emit(categoria);
      this.toggleComponents();
    }
  } */


/* getUniqueId(parts: number): string {
  const stringArr = [];
  for (let i = 0; i < parts; i++) {
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0)
      .toString(16)
      .substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
} */

