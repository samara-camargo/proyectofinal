
import { Injectable, Inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogued = false;
  profile: any;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private db: DatabaseService,
    private router: Router
  ) {
    
  }
  
  async registerUser(email: string, password: string, additionalData: { name: string; phone: string; username: string }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;

      const userDocRef = doc(this.firestore, `users/${userId}`);
      await setDoc(userDocRef, { ...additionalData, email });
      this.router.navigateByUrl('/login');
      console.log('Usuario registrado y documento creado en Firestore');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      console.log('Usuario autenticado:', userCredential.user);
      this.router.navigateByUrl('/events');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  logout() {
    signOut(this.auth).then(() => {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}

