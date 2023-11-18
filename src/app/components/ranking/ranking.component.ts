import { UsuarioService } from 'src/app/services/usuario.service';
import { Component } from '@angular/core';
import {
  Estadistica,
  Usuario,
  posicionTopTen,
} from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent {
  listaEstadisticasUsuarios: Estadistica[] | undefined;
  listaUsuarios: Usuario[] | undefined;
  topTen: posicionTopTen[] = [];
  posicion: posicionTopTen = {
    posicion: 0,
    nickname: '',
    puntos: 0,
  };

  constructor(private UsuarioService: UsuarioService) {}

  async ngOnInit() {
    await this.cargartopten();
  }

  async cargartopten() {
    try {
      this.listaEstadisticasUsuarios =
      await this.UsuarioService.getEstadisticasUsuarios();
      this.listaUsuarios = await this.UsuarioService.getUsuarios();

      this.listaEstadisticasUsuarios?.sort((a, b) => b.puntos - a.puntos);
      const topTenEstadisticas = this.listaEstadisticasUsuarios?.slice(0, 10 | length);

      topTenEstadisticas?.forEach((element, index) => {
        const user = this.listaUsuarios?.find((user) => user.id === element.id)

        if(user !== undefined){
          this.posicion = {
            posicion: index+1,
            nickname: user?.nickname ,
            puntos: element.puntos  ,
          };
          this.topTen.push(this.posicion);
        }
      });
    } catch (error) {
      console.log('error al cargar el top ten');
      console.log(error);
    }
  }

}
