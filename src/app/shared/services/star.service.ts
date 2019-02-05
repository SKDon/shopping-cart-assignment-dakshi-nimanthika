import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';

export interface Star {
  productId: any;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class StarService {

  products: AngularFireList<Product>;
	product: AngularFireObject<Product>;

  constructor(private db: AngularFireDatabase) { }

    // Get all stars that belog to a Product
    getProductStars(productId) {
      this.product = this.db.object('products/' + productId);
		  return this.product.valueChanges();
    }

      // Create or update star
      setStar(productId, value) {
       
        this.products.update(productId, value);
        
      }

}
