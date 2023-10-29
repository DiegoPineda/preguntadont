import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './../../../services/usuario.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin:FormGroup;


  constructor(private UsuarioService:UsuarioService, private fb:FormBuilder){
    this.formLogin = this.fb.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]]
    })
  }

  loginUsuario(){
    const email  = this.formLogin.controls['email'].value;
    const pass = this.formLogin.controls['password'].value;

    
  }
}
