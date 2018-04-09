import { Product } from 'shared/models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product: Product)
  {
    // Create the product and save it in Firebase
    // description, review, and rating are optional
    // 
    product.description = product.description || "";
    product.review = product.review || "";
    product.rating = product.rating || 0;
    return this.db.list('/products').push(product);
  }

  // get all products listed in firebase
  getAll()
  {
    return this.db.list('products');
  }

  // get product in order of the price
  getAllByPrice() {
    return this.db.list('products', {
      query: {
        orderByChild: 'price'      
      }
    });
  }

  // get product in order of the rating
  getAllByRating() {
    return this.db.list('products', {
      query: {
        orderByChild: 'rating',
      }
    });
  }

  // retrieve product with given id
  get(productId)
  {
    return this.db.object('/products/' + productId);
  }

  // need two parameter for id and product
  // because we cannot get product id from product
  update(productId, product)
  {
    // when you passed parameter in update()
    // firebase won't let you do it because
    // id should not be changed or updated
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId)
  {
    return this.db.object('/products/' + productId).remove();
  }

}
