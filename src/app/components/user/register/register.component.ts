import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Estadistica, Tienda, Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  formRegister: FormGroup = this.formBuilder.group({
    nickname: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],
    id: 0
  })

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) {

  }

  redireccionarARegistro() {
    this.router.navigate(["/login"])
  }

  registrarUsuario() {
    if (this.formRegister.invalid) return;

    const usuario: Usuario = {
      nickname: this.formRegister.controls["nickname"].value,
      email: this.formRegister.controls["email"].value,
      password: this.formRegister.controls["password"].value,
      id: this.formRegister.controls["id"].value
    }
    const tienda: Tienda = {
      id: this.formRegister.controls["id"].value,
      monedas: 0,
      cantBombas: 0,
      cantConejos: 0,
      cantRelojes: 0,
      cantReversa: 0
    }
    const estadistica: Estadistica= {
      
        id: this.formRegister.controls["id"].value,
        puntos: 0,
        partidasGanadas: 0,
        partidasPerdidas: 0,
        partidasEmpatadas: 0,
        aciertosArte: 0,
        totalArte: 0,
        aciertosCiencia: 0,
        totalCiencia: 0,
        aciertosDeporte: 0,
        totalDeporte: 0,
        aciertosEntretenimiento: 0,
        totalEntretenimiento: 0,
        aciertosGeografia: 0,
        totalGeografia: 0,
        aciertosHistoria: 0,
        totalHistoria: 0,

    }
    this.usuarioService.postUsuario(usuario);
    this.usuarioService.postUsuarioTienda(tienda);
    this.usuarioService.postUsuarioEstadistica(estadistica);
  }

}
