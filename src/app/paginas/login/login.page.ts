import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  recuerdame: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController 
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      recuerdame: [false]
    });

    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      this.loginForm.patchValue({ username: rememberedUsername });
      this.recuerdame = true;
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          const token = response.accessToken;
          this.authService.setToken(token);

          // guarda el usuario si recuerdame esta activado
          if (this.recuerdame) {
            localStorage.setItem('rememberedUsername', username);
          } else {
            localStorage.removeItem('rememberedUsername');
          }

          this.router.navigate(['/productos']);
        },
        (error) => {
          console.error('Error en la autenticación', error);
          this.showAlert(); // muestra la alerta si la autenticación falla
        }
      );
    }
  }

  // metodo para mostrar la alerta de error
  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Error de autenticacion',
      message: 'Usuario o contraseña no validos',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}