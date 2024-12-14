import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  phone: string = '';
  username: string = '';
  isLoginMode: boolean = true;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private dbService: DatabaseService,
    private router: Router
  ) {}


  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearForm();
  }


  async onSubmit() {
    if (this.isLoginMode) {
      this.loginUser();
    } else {
      this.registerUser();
    }
  }


  async registerUser() {
    if (!this.email || !this.password || !this.name || !this.phone || !this.username) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }

    try {
      await this.authService.registerUser(this.email, this.password, {
        name: this.name,
        phone: this.phone,
        username: this.username,
      });
      this.errorMessage = '';
      this.router.navigate(['/profile']);
    } catch (error) {
      this.errorMessage = 'Error al registrar usuario.';
      console.error(error);
    }
  }

  async loginUser() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingrese su email y contraseña.';
      return;
    }

    try {
      await this.authService.loginUser(this.email, this.password);
      this.errorMessage = '';
      this.router.navigate(['/events']); 
    } catch (error) {
      this.errorMessage = 'Error al iniciar sesión.';
      console.error(error);
    }
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  clearForm() {
    this.email = '';
    this.password = '';
    this.name = '';
    this.phone = '';
    this.username = '';
    this.errorMessage = '';
  }
}
