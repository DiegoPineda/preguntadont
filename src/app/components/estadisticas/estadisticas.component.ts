import { Component } from '@angular/core';
import { Estadistica } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
constructor(private usuarioEstadistica:UsuarioService, private auth:AuthService){}
 
  datos : Estadistica |undefined;

  public porcentajeArte: number = 0;
  public porcentajeGeografia: number = 0;
  public porcentajeHistoria: number = 0;
  public porcentajeDeporte: number = 0;
  public porcentajeEntretenimiento: number = 0;
  public porcentajeCiencia: number = 0;

  ngOnInit(): void {
      this.calcularPorcentajeAciertos();

    
  }

  async calcularPorcentajeAciertos() {
    if(this.auth.currentUser){
      this.datos= await this.usuarioEstadistica.getUsuarioEstadistica(this.auth.currentUser.id);
    }
    console.log('Datos:', this.datos);
    if(this.datos){
    this.porcentajeArte = (this.datos.aciertosArte / this.datos.totalArte) * 100;
    this.porcentajeGeografia = (this.datos.aciertosGeografia / this.datos.totalGeografia) * 100;
    this.porcentajeHistoria = (this.datos.aciertosHistoria / this.datos.totalHistoria) * 100;
    this.porcentajeDeporte = (this.datos.aciertosDeporte / this.datos.totalDeporte) * 100;
    this.porcentajeEntretenimiento = (this.datos.aciertosEntretenimiento / this.datos.totalEntretenimiento) * 100;
    this.porcentajeCiencia = (this.datos.aciertosCiencia / this.datos.totalCiencia) * 100;

    console.log('Porcentaje Ciencia:', this.porcentajeCiencia);
    console.log('Porcentaje Deporte:', this.porcentajeDeporte);
    console.log('Porcentaje Entretenimiento:', this.porcentajeEntretenimiento);
    console.log('Porcentaje Geografía:', this.porcentajeGeografia);
    console.log('Porcentaje Historia:', this.porcentajeHistoria);
    console.log('Porcentaje Arte:', this.porcentajeArte);
    }
    
  }



}
