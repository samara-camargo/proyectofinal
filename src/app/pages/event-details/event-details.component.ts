import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  event: any;
  quantity: number = 1;
  Math = Math; 

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
    private router: Router
  ) {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.dbService.getDocumentById('events', eventId).subscribe({
        next: (data) => (this.event = data),
        error: (err) => console.error(err),
      });
    }
  }

  addToCart() {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).uid : null;
  
    if (!userId) {
      alert('Por favor, inicia sesión para añadir al carrito.');
      this.router.navigate(['/auth']);
      return;
    }
  
    const discountedPrice = this.event.discount
      ? this.event.price * (1 - this.event.discount / 100)
      : this.event.price;
  
    const cartData = {
      eventId: this.event.id,
      eventTitle: this.event.title,
      eventImage: this.event.image,
      quantity: this.quantity,
      pricePerTicket: discountedPrice,
      userId: userId,
    };
  
    this.dbService.addDocument2('cart', cartData).subscribe({
      next: () => {
        alert('Tickets añadidos al carrito');
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error('Error al añadir al carrito:', err);
        alert('Hubo un error al añadir al carrito.');
      },
    });
  }
  



  buyNow() {
    this.router.navigate(['/checkout'], {
      queryParams: { eventId: this.event.id, quantity: this.quantity },
    });
  }
}
