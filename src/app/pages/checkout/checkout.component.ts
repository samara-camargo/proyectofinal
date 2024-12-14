import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;
  paymentDetails = {
    cardNumber: '',
    cardName: '',
    expiration: '',
    cvv: ''
  };

  constructor(private dbService: DatabaseService, private router: Router) {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).uid : null;

    if (userId) {
      this.dbService.getDocumentsByUserId('cart', userId).subscribe({
        next: (data) => {
          this.cartItems = data || [];
          this.calculateTotalPrice();
        },
        error: (err) => console.error('Error al obtener carrito:', err),
      });
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.pricePerTicket,
      0
    );
  }

  completePurchase() {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).uid : null;

    if (userId && this.cartItems.length > 0) {
      const purchase = {
        userId: userId,
        items: this.cartItems,
        total: this.totalPrice,
        date: new Date().toISOString(),
      };

      this.dbService.addDocument('purchases', purchase).subscribe({
        next: () => {
          alert('Compra realizada con éxito');
          this.router.navigate(['/events']);
        },
        error: (err) => console.error('Error al registrar la compra:', err),
      });
    } else {
      alert('No hay artículos en el carrito.');
    }
  }
}
