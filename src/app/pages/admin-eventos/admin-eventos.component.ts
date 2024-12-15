import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-eventos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-eventos.component.html',
  styleUrls: ['./admin-eventos.component.scss'],
})
export class AdminEventosComponent implements OnInit {
  events: any[] = [];
  isDialogOpen: boolean = false;
  currentEvent: any = null;
  eventForm: FormGroup;
  successMessage: string = '';

  constructor(private dbService: DatabaseService, private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
      image: ['', Validators.required],
      category: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      coordinates: this.fb.group({
        latitude: ['', ],
        longitude: ['', ],
      }),
      date: ['', Validators.required],
      hour: ['', Validators.required],
      stockTickets: [0, Validators.required],
      featured: [false],
    });
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    this.dbService.fetchFirestoreCollection('events').subscribe((data) => {
      console.log('Eventos cargados:', data);
      this.events = data;
    });
  }

  openDialog(event?: any): void {
    this.isDialogOpen = true;
    this.currentEvent = event || null;
    if (event) {
      this.eventForm.patchValue(event);
    } else {
      this.eventForm.reset();
    }
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  saveEvent(): void {
    if (this.eventForm.valid) {
      const eventData = this.eventForm.value;
  
      console.log('Datos del formulario antes de guardar:', eventData);
  
      if (this.currentEvent && this.currentEvent.id) {
        this.dbService
          .updateFirestoreDocument('events', this.currentEvent.id, eventData)
          .then(() => {
            console.log('Evento actualizado con éxito:', eventData);
            this.successMessage = 'Evento actualizado exitosamente'; 
            setTimeout(() => {
              this.successMessage = '';  
            }, 5000);
            this.closeDialog();
            this.fetchEvents();
          })
          .catch((err) => console.error('Error al actualizar evento:', err));
      } else {
        this.dbService
          .addFirestoreDocument('events', eventData)
          .then(() => {
            console.log('Evento creado con éxito:', eventData);
            this.successMessage = 'Evento guardado exitosamente';  
          setTimeout(() => {
            this.successMessage = '';  
          }, 5000);
            this.closeDialog();
            this.fetchEvents();
          })
          .catch((err) => console.error('Error al crear evento:', err));
      }
    } else {
      console.log('Data:',this.eventForm.value);
      console.error('Formulario inválido:', this.eventForm.errors);
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  

  deleteEvent(eventId: string): void {
    this.dbService.deleteFirestoreDocument('events', eventId).then(() => {
      console.log('Evento eliminado:', eventId);
      this.fetchEvents();
    });
  }
  goToEvents(): void {
    window.location.href = '/events'; // Redirige al componente Events
  }
  
}
