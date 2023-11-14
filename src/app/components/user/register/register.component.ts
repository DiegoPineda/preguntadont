import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Estadistica, Tienda, Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { checkEmail, checkNickName } from 'src/app/shared/validators/registro.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  formRegister: FormGroup = this.formBuilder.group({
    nickname: ["", [Validators.required, Validators.minLength(4)],[this.validateNickname.bind(this)]],
    email: ["", [Validators.required, Validators.email],[this.validateEmail.bind(this)]],
    password: ["", [Validators.required, Validators.minLength(8)]],
    id: 0
  })

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) {

  }



  validateNickname(control: AbstractControl) {
    const nickname = control.value;
    return checkNickName(nickname).pipe(
      map((valid) => (valid ? null : { nicknameTaken: true }))
    );
  }
  
  validateEmail(control: AbstractControl) {
    const email = control.value;
    return checkEmail(email).pipe(
      map((valid) => (valid ? null : { emailTaken: true }))
    );
  }


  redireccionarARegistro() {
    this.router.navigate(["/login"])
  }

  async registrarUsuario() {
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
    await this.usuarioService.postUsuario(usuario);
    await this.usuarioService.postUsuarioTienda(tienda);
    await this.usuarioService.postUsuarioEstadistica(estadistica);
    this.redireccionarARegistro();
  }

  validar(field: string, error: string){
    return this.formRegister.controls[field].getError(error)
    &&
    this.formRegister.controls[field].touched
  }

  
}
