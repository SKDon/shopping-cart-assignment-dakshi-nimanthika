import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

export interface Star {
  userId: any;
  productId: any;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private afs: AngularFirestore) { }

    // Star reviews that belong to a user
    getUserStars(userId) {
      const starsRef = this.afs.collection('stars', ref => ref.where('userId', '==', userId) );
      return starsRef.valueChanges();
    }

    // Get all stars that belog to a Product
    getProductStars(productId) {
      const starsRef = this.afs.collection('stars', ref => ref.where('productId', '==', productId) );
      return starsRef.valueChanges();
    }

      // Create or update star
      setStar(userId, productId, value) {
        // Star document data
        const star: Star = { userId, productId, value };

        // Custom doc ID for relationship
        const starPath = `stars/${star.userId}_${star.productId}`;

        // Set the data, return the promise
        return this.afs.doc(starPath).set(star);
      }

}
