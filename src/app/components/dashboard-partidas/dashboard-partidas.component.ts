import { UsuarioService } from './../../services/usuario.service';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Partida, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PartidaService } from 'src/app/services/partida.service';


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

  constructor(private router: Router, 
              private partidaService:PartidaService,
              private auth: AuthService,
              private UsuarioService:UsuarioService) {}

  async ngOnInit(){
    await this.cargarPartidasPendientes();
    await this.cargarUsuarios();
  }
  irAPlay() {
    
    this.partidaService.crearPartida();
    
  }


  async cargarPartidasPendientes(){
    this.idUsuario =  this.auth.currentUser?.id;
    if(this.idUsuario){
      this.listaPendientes = await this.partidaService.getPartidasDeUsuario(this.idUsuario);
    }
  }
  
  async cargarUsuarios(){
    this.listaUsuarios = await this.UsuarioService.getUsuarios();
  }


}
