import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tienda, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioTiendaService } from 'src/app/services/usuario-tienda.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router,private usuarioService: UsuarioService, private usuarioTiendaService: UsuarioTiendaService){

  }

  idActual: number | undefined;
  tiendaUsuario: Tienda|undefined;
  ngOnInit() {
    this.idActual = this.authService.currentUser?.id;

  if (this.idActual !== undefined) {
    this.getInfoTienda(this.idActual).subscribe(
      (tienda) => {
        this.tiendaUsuario = tienda;
      },
      (error) => {
        console.error('Error al obtener los datos de la tienda', error);
      }
    );
  }
}

  get getUser():Usuario | undefined{
    return this.authService.currentUser;
  }
  getInfoTienda(id: number): Observable<Tienda | undefined> {
    return this.usuarioTiendaService.getUserTienda(id);
  }
  
  onLogOut(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
