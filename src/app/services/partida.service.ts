import { Injectable } from '@angular/core';
import { Partida, Usuario } from '../interfaces/interfaces';
import { AuthService } from './auth.service';
import { SharingService } from './sharing.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  listaPartidas: Partida[] | undefined;


  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  url: string = "http://localhost:3100/partidas";
  url2: string= "http://localhost:3100/partidasTerminadas";

  async getPartidas(): Promise<Partida[] | undefined> {
    try {
      const resultado = await fetch(this.url, { method: "GET" })
      const partidas = resultado.json();
      return partidas;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async getPartida(id: string): Promise<Partida | undefined> {
    try {
      const resultado = await fetch(this.url+"/"+id, { method: "GET" })
      const partidas = resultado.json();
      return partidas;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  async getPartidasDeUsuario(id: number): Promise<Partida[] | undefined> {
    try {
      const totalPartidas = await this.getPartidas();
      if (totalPartidas) {
        const partidasUsuario:Partida[]=[];
        for (let item of totalPartidas) {
          if(item.idUsuario1 === id || item.idUsuario2 === id){
            partidasUsuario.push(item);
          }
        }
        return partidasUsuario;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  async postPartida(partida: Partida) {
    try {
      await fetch(this.url, {
        method: "POST",
        body: JSON.stringify(partida),
        headers: { "Content-type": "application/json" }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async putPartida(partida: Partida) {
    try {
      await fetch(`${this.url}/${partida.id}`, {
        method: "PUT",
        body: JSON.stringify(partida),
        headers: { "Content-type": "application/json" }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async buscarPartida(partida: Partida): Promise<Partida | undefined> {
    try {
      this.listaPartidas = await this.getPartidas();
      const partidaEncontrada = this.listaPartidas?.find((e) => e.id === partida.id);
      return partidaEncontrada;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

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

  async crearPartida() {
    let usuario: Usuario | undefined;
    this.resetPartida();
    usuario = await this.auth.currentUser;
    this.listaPartidas=undefined;
    
    this.listaPartidas = await this.getPartidas();
    this.partida.id=this.getUniqueId(4);
    if (this.listaPartidas !== undefined) {
      for (const e of this.listaPartidas) {
        if (e.idUsuario1 !== usuario?.id && e.idUsuario2 === 0) {
          if (usuario?.id) {
            this.partida = e;
            this.partida.idUsuario2 = usuario.id;
            await this.putPartida(this.partida);
            this.router.navigate(["/partida", this.partida.id]);
            console.log("putPartida en partida.service");
            return;
          }
        }
      }
  
      if (usuario) {
        this.partida.idUsuario1 = usuario.id;
        await this.postPartida(this.partida);
        this.router.navigate(["/partida", this.partida.id]);
        console.log("postPartida en partida.service");
      }
    }
  }

  async deletePartida(partidaId: string) {
    const deleteUrl = `${this.url}/${partidaId}`;

    try {
      await fetch(deleteUrl, { method: "DELETE" });
      console.log(`Partida eliminada con éxito: ${partidaId}`);
    } catch (error) {
      console.log(`Error al eliminar la partida ${partidaId}:`, error);
    }
  }

  async postPartidaTerminada(partida: Partida) {
    try {
      await fetch(this.url2, {
        method: "POST",
        body: JSON.stringify(partida),
        headers: { "Content-type": "application/json" }
      })
    } catch (error) {
      console.log(error);
    }
  }

  async getPartidasTerminadas(): Promise<Partida[] | undefined> {
    try {
      const resultado = await fetch(this.url2, { method: "GET" })
      const partidas = resultado.json();
      return partidas;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  resetPartida(){
    this.partida.id= "";
    this.partida.idUsuario1= 0;
    this.partida.idUsuario2= 0;
    this.partida.aciertosUsuario1= 0;
    this.partida.aciertosUsuario2= 0;
    this.partida.usuarioFinalizo1= false;
    this.partida.usuarioFinalizo2= false;
    this.partida.contadorUsuario1= 0;
    this.partida.contadorUsuario2= 0;
    this.partida.amigo= false
  }



}
