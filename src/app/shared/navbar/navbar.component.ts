import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { Tienda, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UsuarioTiendaService } from 'src/app/services/usuario-tienda.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    private sharingObservableTienda: SharingService,
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService,
    private usuarioTiendaService: UsuarioTiendaService
  ) {}

  idActual: number | undefined;
  tiendaUsuario: Tienda | undefined;
  ngOnInit() {
    this.actualizarNavbar();
    this.sharingObservableTienda.tiendaUsuario.subscribe((tienda) => {
      this.tiendaUsuario = tienda;
    });
  }

  actualizarNavbar() {
    this.idActual = this.authService.currentUser?.id;

    if (this.idActual !== undefined) {
      this.getInfoTienda(this.idActual)
        .pipe(
          tap((tienda) => {
            this.tiendaUsuario = tienda;
          }),
          catchError((error) => {
            console.error('Error al obtener los datos de la tienda', error);
            return [];
          })
        )
        .subscribe();
    }
  }

  get getUser(): Usuario | undefined {
    return this.authService.currentUser;
  }
  getInfoTienda(id: number): Observable<Tienda | undefined> {
    return this.usuarioTiendaService.getUserTienda(id);
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
