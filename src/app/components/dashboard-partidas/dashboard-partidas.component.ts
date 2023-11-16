import { UsuarioService } from './../../services/usuario.service';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partida, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PartidaService } from 'src/app/services/partida.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UsuarioTiendaService } from 'src/app/services/usuario-tienda.service';


@Component({
  selector: 'app-dashboard-partidas',
  templateUrl: './dashboard-partidas.component.html',
  styleUrls: ['./dashboard-partidas.component.css']
})
export class DashboardPartidasComponent {
  listaPendientes: Partida[]|undefined;
  listaTerminadas: Partida[]|undefined;
  listaUsuarios: Usuario[] | undefined;
  idUsuario:number|undefined;


  constructor(
              private partidaService:PartidaService,
              private auth: AuthService,
              private UsuarioService:UsuarioService,
              private usuarioTiendaService: UsuarioTiendaService,
              private sharingObservableTienda: SharingService,
              private router:Router) {}

  async ngOnInit(){
    await this.cargarPartidasPendientes();
    await this.cargarPartidasTerminadas();
    await this.cargarUsuarios();
  }
  irAPlay() {
    
    this.partidaService.crearPartida();


    if (this.auth.currentUser?.id !== undefined) {
      this.usuarioTiendaService.getUserTienda(this.auth.currentUser.id).subscribe(usuarioTienda => {
        this.usuarioTiendaService.updateUserTienda(usuarioTienda);
          this.sharingObservableTienda.updateTiendaUsuario(usuarioTienda);
      });
    }
  }


  async cargarPartidasPendientes(){
    this.idUsuario =  this.auth.currentUser?.id;
    if(this.idUsuario){
      this.listaPendientes = await this.partidaService.getPartidasDeUsuario(this.idUsuario);
    }
  }

  async cargarPartidasTerminadas(){
    this.idUsuario = this.auth.currentUser?.id;
    if(this.idUsuario){
      this.listaTerminadas = await this.partidaService.getPartidasTerminadas();
    }
  }
  
  async cargarUsuarios(){
    this.listaUsuarios = await this.UsuarioService.getUsuarios();
  }


  reanudarPartida(id: string){
    this.router.navigate(["/partida", id]);
  }
}
