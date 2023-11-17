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
  constructor(private usuarioEstadistica: UsuarioService, private auth: AuthService) { }

  datos: Estadistica | undefined;

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
    if (this.auth.currentUser) {
      this.datos = await this.usuarioEstadistica.getUsuarioEstadistica(this.auth.currentUser.id);
    }
    console.log('Datos:', this.datos);
    if (this.datos) {
      this.porcentajeArte = this.calcularPorcentaje(this.datos.aciertosArte, this.datos.totalArte);
      this.porcentajeGeografia = this.calcularPorcentaje(this.datos.aciertosGeografia, this.datos.totalGeografia);
      this.porcentajeHistoria = this.calcularPorcentaje(this.datos.aciertosHistoria, this.datos.totalHistoria);
      this.porcentajeDeporte = this.calcularPorcentaje(this.datos.aciertosDeporte, this.datos.totalDeporte);
      this.porcentajeEntretenimiento = this.calcularPorcentaje(this.datos.aciertosEntretenimiento, this.datos.totalEntretenimiento);
      this.porcentajeCiencia = this.calcularPorcentaje(this.datos.aciertosCiencia, this.datos.totalCiencia);

    }

  }

  calcularPorcentaje(aciertos: number, total: number): number {
    if (total === 0) {
      return 0; // Evitar la división por cero
    }

    const porcentaje = (aciertos / total) * 100;
    return parseFloat(porcentaje.toFixed(1)); // Limitar a un solo decimal
  }
}



