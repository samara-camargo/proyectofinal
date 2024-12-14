import { ApplicationConfig,importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
 
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule,NgModel, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule, ReactiveFormsModule,  AngularFireAuthModule,
      CommonModule),
    provideFirebaseApp(() => initializeApp({
      projectId: 'p3apptickets',
      appId: '1:412415328327:web:c444d1f815c8fcbccd3162',
      storageBucket: 'p3apptickets.firebasestorage.app',
      apiKey: 'AIzaSyClLaVYOlKxGqtnzJzlyc3d8ESGoAQ-3aw',
      authDomain: 'p3apptickets.firebaseapp.com',
      messagingSenderId: '412415328327',
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};


