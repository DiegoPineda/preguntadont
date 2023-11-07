import { Component } from '@angular/core';
import { Partida, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PartidaService } from 'src/app/services/partida-proceso.service';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent {
  constructor(private partidaService: PartidaService, private auth: AuthService) { }
  listaPartidas: Partida[] | undefined = [];

  usuario: Usuario | undefined;

  mostrarPlayComponent = true;



  ngOnInit() {
    this.usuario = this.auth.currentUser;
    this.crearPartida();
    this.iniciarPartida();

  }

  iniciarPartida(){

  }

  togglePlayComponent() {
    this.mostrarPlayComponent = !this.mostrarPlayComponent;
  }

  async crearPartida() {
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
        return null;
      }
    }
  
    if (this.usuario?.id !== undefined) {
      partida.idUsuario1 = this.usuario?.id;
      this.partidaService.postPartida(partida);
      return partida;
    } else {
      return null;
    }
  }

}














/* const estadistica: Estadistica= {
      
        id: this.formRegister.controls["id"].value,
        puntos: 0,
        partidasGanadas: 0,
        partidasPerdidas: 0,
      

    }
    this.usuarioService.postUsuario(usuario); */