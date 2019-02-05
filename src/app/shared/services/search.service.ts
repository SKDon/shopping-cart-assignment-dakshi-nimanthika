import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  products: AngularFireList<Product>;
	product: AngularFireObject<Product>;

  constructor(private db: AngularFireDatabase) { }

  getProducts() {
		this.products = this.db.list('products');
		return this.products;
  }

  search(q: string): Observable<any> {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.products['productName'] === q ? this.products['productName'] : 0;
  }

}
