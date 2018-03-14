import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    //return something, so we can do something after
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products');
  }

  getProduct(productId){
    return this.db.object('/products/' + productId);
  }

  updateProduct(productId, product){
    //cannot use product.id, this causes runtime error
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
