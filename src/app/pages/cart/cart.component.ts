import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private dbService: DatabaseService, private router: Router) {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).uid : null;
    if (userId) {
      this.dbService.getDocumentsByUserId('cart', userId).subscribe({
        next: (data) => {
          this.cartItems = data || [];
          this.calculateTotalPrice();
        },
        error: (err) => console.error('Error al obtener items del carrito:', err),
      });
    } else {
      console.error('No se encontró un usuario autenticado.');
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.pricePerTicket,
      0
    );
  }

  removeItem(item: any): void {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).uid : null;
    if (userId) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
      this.calculateTotalPrice();
  
      this.dbService.removeItemFromCart(userId, item.eventId).subscribe({
        next: () => console.log('Elemento eliminado del carrito en Firebase'),
        error: (err) => console.error('Error al eliminar elemento del carrito en Firebase:', err),
      });
    } else {
      console.error('No se encontró un usuario autenticado.');
    }
  }
  
  

  checkout() {
    this.router.navigate(['/checkout'], {
      queryParams: { totalPrice: this.totalPrice },
    });
  }

  goToEvents() {
    this.router.navigate(['/events']);
  }
  

}
