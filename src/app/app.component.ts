import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMenuOpen = true;

  constructor(public auth: AuthService) {
    console.log('AppComponent constructor ejecutado');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
