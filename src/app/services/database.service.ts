import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError,from } from 'rxjs';
import { arrayRemove } from '@angular/fire/firestore';  // Importamos arrayRemove

import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDocs
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    private firestore: Firestore,
    private http: HttpClient
  ) {}

  /**
   
   * @param collection 
   */
  fetchLocalCollection(collection: string): Observable<any> {
    return this.http.get(`db/${collection}.json`).pipe(
      catchError((error) => {
        console.error(`Error al obtener datos locales de ${collection}`, error);
        return throwError(() => new Error('Error al obtener datos locales.'));
      })
    );
  }

  /**
   * 
   * @param collectionName 
   * @param documentId 
   */
  getDocumentById(collectionName: string, documentId: string): Observable<any> {
    const docRef = doc(this.firestore, `${collectionName}/${documentId}`);
    return docData(docRef, { idField: 'id' }).pipe(
      catchError((error) => {
        console.error(`Error al obtener documento ${documentId}`, error);
        return throwError(() => new Error('Error al obtener documento.'));
      })
    );
  }
  getDocumentsByUserId(collectionName: string, userId: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    const q = query(collectionRef, where('userId', '==', userId));
    
    return new Observable<any[]>((observer) => {
      getDocs(q)
        .then((querySnapshot) => {
          const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          observer.next(documents);
          observer.complete();
        })
        .catch((error) => {
          console.error(`Error al obtener documentos de ${collectionName}:`, error);
          observer.error(error);
        });
    });
  }
 
  updateCart(userId: string, cartData: any): Observable<void> {
    const cartRef = doc(this.firestore, `cart/${userId}`);
    return from(setDoc(cartRef, cartData, { merge: true })).pipe(
      catchError((error) => {
        console.error('Error al actualizar el carrito:', error);
        return throwError(() => new Error('Error al actualizar el carrito.'));
      })
    );
  }

  completePurchase(userId: string, orderData: any): Observable<void> {
    const orderRef = doc(collection(this.firestore, 'orders'));
    return from(setDoc(orderRef, { userId, ...orderData })).pipe(
      catchError((error) => {
        console.error('Error al completar la compra:', error);
        return throwError(() => new Error('Error al completar la compra.'));
      })
    );
  }
  addDocument(collectionName: string, data: any): Observable<any> {
    const collectionRef = collection(this.firestore, collectionName);
    return from(addDoc(collectionRef, data));
  }
  addDocument2(collectionName: string, data: any): Observable<any> {
    const collectionRef = collection(this.firestore, collectionName);
    return from(addDoc(collectionRef, data));
  }
  
  removeItemFromCart(userId: string, eventId: string): Observable<void> {
    const cartRef = doc(this.firestore, `cart/${userId}`);
    return new Observable<void>((observer) => {
      this.getDocumentById('cart', userId).subscribe({
        next: (cart: any) => {
          if (cart && cart.items) {
            const updatedItems = cart.items.filter((item: any) => item.eventId !== eventId);
  
            // Actualiza los datos en Firestore
            setDoc(cartRef, { items: updatedItems }, { merge: true })
              .then(() => {
                observer.next();
                observer.complete();
              })
              .catch((error) => {
                observer.error(error);
              });
          } else {
            observer.error(new Error('No se encontraron items en el carrito.'));
          }
        },
        error: (err) => observer.error(err),
      });
    });
  }
 
  
  /**
   * 
   * @param collectionName 
   * @param field 
   * @param value 
   */
  getDocumentsByField(collectionName: string, field: string, value: any): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    const queryRef = query(collectionRef, where(field, '==', value));
    return collectionData(queryRef, { idField: 'id' }).pipe(
      catchError((error) => {
        console.error(`Error al filtrar documentos por ${field}`, error);
        return throwError(() => new Error('Error al filtrar documentos.'));
      })
    );
  }

  /**
   
    @param collectionName
   */
  fetchFirestoreCollection(collectionName: string): Observable<any[]> {
    const collectionRef = collection(this.firestore, collectionName);
    return collectionData(collectionRef, { idField: 'id' }).pipe(
      catchError((error) => {
        console.error(`Error al obtener colección ${collectionName}`, error);
        return throwError(() => new Error('Error al obtener colección.'));
      })
    );
  }


  
  

  /**
   * @param collectionName 
   * @param data 
   */
  addFirestoreDocument(collectionName: string, data: any): Promise<any> {
    const collectionRef = collection(this.firestore, collectionName);
    return addDoc(collectionRef, data).catch((error) => {
      console.error(`Error al agregar documento en ${collectionName}`, error);
      throw new Error('Error al agregar documento.');
    });
  }

  /**
   * @param collectionName 
   * @param uuid 
   * @param data 
   */
  updateFirestoreDocument(collectionName: string, uuid: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${uuid}`);
    return updateDoc(docRef, data).catch((error) => {
      console.error(`Error al actualizar documento ${uuid}`, error);
      throw new Error('Error al actualizar documento.');
    });
  }

  /**
   * 
   * @param collectionName 
   * @param uuid 
   */
  deleteFirestoreDocument(collectionName: string, uuid: string): Promise<void> {
    const docRef = doc(this.firestore, `${collectionName}/${uuid}`);
    return deleteDoc(docRef).catch((error) => {
      console.error(`Error al eliminar documento ${uuid}`, error);
      throw new Error('Error al eliminar documento.');
    });
  }


}

