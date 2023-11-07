import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  iniciarSesion() {
    if (this.formLogin.invalid) return;

    this.auth.verificarUserAndPass(
      this.formLogin.controls['email'].value,
      this.formLogin.controls['password'].value
    ).subscribe(
      (valid: boolean) => {
        if (valid) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Email o contraseña incorrectos';
        }
      }
    );
  }
}
