import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './../../../services/usuario.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin: FormGroup;

  
  constructor(
    private UsuarioService: UsuarioService,
    private fb: FormBuilder,
    private auth: AuthService) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  ngOnInit(){
    this.onLogOut();
  }


  onLogOut(){
    this.auth.logout();
  }

/* 
  loginUsuario() {
    const email = this.formLogin.controls['email'].value;
    const pass = this.formLogin.controls['password'].value;
    this.auth.login(email, pass)
  }
 */
  iniciarSession() {
    if (this.formLogin.invalid) return;

    this.auth.verificarUserAndPass(
      this.formLogin.controls['email'].value,
      this.formLogin.controls['password'].value)
  }

}
