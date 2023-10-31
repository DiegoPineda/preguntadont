import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
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
    id:0 
  })

  constructor(private formBuilder: FormBuilder, private usuarioService : UsuarioService, private router:Router){

  }

  redireccionarARegistro(){
    this.router.navigate(["/login"])
  }

  registrarUsuario(){
    if(this.formRegister.invalid) return;
    
    const usuario: Usuario={
      nickname: this.formRegister.controls["nickname"].value,
      email: this.formRegister.controls["email"].value,
      password: this.formRegister.controls["password"].value,
      id: this.formRegister.controls["id"].value
    }
    this.usuarioService.postUsuario(usuario);
  }

}
