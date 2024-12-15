import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DatabaseService } from '../../services/database.service';
import { Event } from '../../models/event.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [DatabaseService],
})
export class EventsComponent implements OnInit {
  events$: Observable<Event[]> = of([]); 
  filterForm: FormGroup; 
  categories = ['Musical', 'Conferencias', 'Deportes', 'Feria']; 
  cities = ['Cochabamba', 'La Paz', 'Santa Cruz']; 

  constructor(
    private db: DatabaseService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.filterForm = this.fb.group({
      category: [''], 
      city: [''],
      date: [''],
      featuredOnly: [false], 
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.db.fetchFirestoreCollection('events').subscribe((events) => {
      this.events$ = of(
        events.map((event) => ({
          ...event,
          price: typeof event.price === 'number' ? event.price : null, // Asegurar que price sea numérico
        }))
      );
    });
  }
  

  applyFilters(): void {
    const { category, city, date, featuredOnly } = this.filterForm.value;

  if (featuredOnly) {
    this.events$ = this.db.getDocumentsByField('events', 'featured', true);
  } else if (category) {
    this.events$ = this.db.getDocumentsByField('events', 'category', category);
  } else if (city) {
    this.events$ = this.db.getDocumentsByField('events', 'city', city);
  } else if (date) {
    this.events$ = this.db.getDocumentsByField('events', 'date', date);
  } else {
    this.loadEvents();
  }
  }

  viewEventDetails(event: any): void {
    this.router.navigate(['/event-details', event.id]);
  }
  goToHistory(): void {
    this.router.navigate(['/history']);
  }
  goToAdmin(): void {
    this.router.navigate(['/admin']);
  }
    
  goToCart(): void {
    this.router.navigate(['/cart']);
  }
  
  
}
