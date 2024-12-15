import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [DatePipe] // Proveedor necesario para usar DatePipe
})
export class HistoryComponent implements OnInit {
  purchases: any[] = [];

  constructor(private dbService: DatabaseService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).uid : null;

    if (userId) {
      this.dbService.getDocumentsByField('purchases', 'userId', userId).subscribe({
        next: (data) => {
          this.purchases = data.map(purchase => ({
            ...purchase,
            formattedDate: this.datePipe.transform(purchase.date, 'd \'de\' MMMM \'de\' y, HH:mm'), // Formato legible
          }));
        },
        error: (err) => console.error(err),
      });
    }
  }
  goToEvents(): void {
    window.location.href = '/events'; // Redirige al componente Events
  }
  
}
