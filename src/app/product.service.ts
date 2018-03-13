import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    //return something, so we can do something after
    return this.db.list('/products').push(product);
  }
}
