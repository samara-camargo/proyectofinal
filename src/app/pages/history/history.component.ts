import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  purchases: any[] = [];

  constructor(private dbService: DatabaseService) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).uid : null;

    if (userId) {
      this.dbService.getDocumentsByField('purchases', 'userId', userId).subscribe({
        next: (data) => {
          this.purchases = data;
        },
        error: (err) => console.error(err),
      });
    }
  }
}

