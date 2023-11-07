import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { SharingService } from 'src/app/services/sharing.service';
import { TiendaService } from 'src/app/services/tienda.service';
import { UsuarioTiendaService } from 'src/app/services/usuario-tienda.service';
import { NumeroPositivoValidator } from 'src/app/shared/validators/numero-positivo.validator';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {

  constructor(private sharingObservableTienda: SharingService, private tiendaService: TiendaService, private usuarioTiendaService: UsuarioTiendaService, private auth: AuthService, private fb: FormBuilder) {
  }

  listaProductos: Productos[] | undefined = [];

  formCompra: FormGroup = this.fb.group({
    cantidad: [, [Validators.required, Validators.min(1), NumeroPositivoValidator.positivo]]
  })

  ngOnInit(): void {
    this.mostrarProductos();
  }

  async mostrarProductos() {
    this.listaProductos = await this.tiendaService.getProductos();
  }

  comprarProducto(id: number, precio: number) {
    if (this.formCompra.invalid) return;
    if (this.auth.currentUser?.id !== undefined) {
      this.usuarioTiendaService.getUserTienda(this.auth.currentUser.id).subscribe(usuarioTienda => {
        const cantidadComprada = this.formCompra.controls["cantidad"].value;
        const precioTotal = precio * cantidadComprada;

        console.log(usuarioTienda.monedas);
        console.log(precioTotal);

        if (usuarioTienda.monedas >= precioTotal) {
          // Resto de tu lógica aquí...
          usuarioTienda.monedas -= precioTotal;
          switch (id) {
            case 1:
              // Acciones para el caso id igual a 1
              usuarioTienda.cantBombas += cantidadComprada;
              break;
            case 2:
              // Acciones para el caso id igual a 2
              usuarioTienda.cantConejos += cantidadComprada;
              break;
            case 3:
              // Acciones para el caso id igual a 3
              usuarioTienda.cantReversa += cantidadComprada;
              break;
            case 4:
              // Acciones para el caso id igual a 4
              usuarioTienda.cantRelojes += cantidadComprada;
              break;
          }

          this.usuarioTiendaService.updateUserTienda(usuarioTienda)
          this.sharingObservableTienda.updateTiendaUsuario(usuarioTienda);


          alert("Gracias por la compra :)")

        } else {
          alert("Monedas insuficientes");
        }
      });
    }
  }

}
