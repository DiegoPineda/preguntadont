import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { Tienda, Usuario } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UsuarioTiendaService } from 'src/app/services/usuario-tienda.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { verificarNickName } from '../validators/registro.validator';

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
    private usuarioTiendaService: UsuarioTiendaService,
  ) { }

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

  async editarUsuario() {




    const { value: formValues } = await Swal.fire({
      title: "Editar usuario",
      html: `
      <div class="editarUsuario">
        <label for: "swal-input1">nickname</label>
        <input id="swal-input1" class="swal2-input"">
        <label for: "swal-input2">password</label>
        <input type="password" id="swal-input2" class="swal2-input">
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const input1 = document.getElementById("swal-input1") as HTMLInputElement | null;
        const input2 = document.getElementById("swal-input2") as HTMLInputElement | null;
        return [
          input1?.value,
          input2?.value
        ];
      }
    });
    if (formValues) {
      const [newNickname, newPassword] = formValues;
    
      // Realizar la comparación y actualización en el servidor JSON
      const user = this.authService.currentUser; // Debes obtener el ID del usuario actual, por ejemplo, desde un token de autenticación.
  
      // Verificar y actualizar el nickname si no está vacío
      if (newNickname !== "") {
        const nicknameExists = await verificarNickName(newNickname); // Debes implementar esta función
        console.log(nicknameExists);
        if (!nicknameExists && user) {
          user.nickname = newNickname;
          console.log("newNickname");
        }else{
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El nickname ya se encuentra en uso!",
          });
          return ;
        }
        //Verificar que tenga entre 4 y 16 caracteres
        if (newNickname.length>=4 && newNickname.length<=16) {
          user.nickname = newNickname;
          console.log("newNickname");
        }else{
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El nickname debe tener entre 4 y 16 caracteres!",
          });
          return ;
        }
      }
    
      // Verificar y actualizar la contraseña si no está vacía
      if (newPassword !== "" && user) {
        if(newPassword.length>=8 && newPassword.length<=16){
          user.password = newPassword;
        }else{
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "La contraseña debe tener entre 8 y 16 caracteres!",
          });
          return;
        }
        
      }
    
      // Enviar la actualización al servidor
      if(user){
        this.usuarioService.putUsuario(user);
      }
      
    
      await Swal.fire({
        title: "Usuario modificado con exito!",
        icon: "success"
      });
      window.location.reload();
    }
  
  }
}