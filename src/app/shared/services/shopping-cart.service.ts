import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  //first inject the firebase data object
  constructor(private db:AngularFireDatabase) { }

  async getCart():Promise<Observable<ShoppingCart>>{
    //make use use async to ensure cardId not promise
    let cartId = await this.getOrCreateCartId();
    //need to map it to ShoppingCart object
    return this.db.object('/shopping-carts/' + cartId)
      .map(x=> new ShoppingCart(x.items));
  }

  async addToCart(product:Product){
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product){
    this.updateItem(product, -1);
  }

  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  //private, keeps API of this service very simple
  private async getOrCreateCartId(): Promise<string> {
    //get the shopping cart ID from local storage first
    let cartId = localStorage.getItem('cartId');

    if(!cartId){ //if you don't have a shopping cart
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;

      //above code make our codes more linear
      // //return a promise
      // this.create().then(result => {
      //   //save the cartId in the localStorage
      //   localStorage.setItem('cartId', result.key);
      //   //add product to cart
      //   return this.getCart(result.key);
      // });
      
    } else { //if we have a shopping cart
      //everytime add a product to cart, will go to firebase to get a cart id
      return cartId;
    }
  }

  private getItem(cardId: string, productId: string){
    return this.db.object('/shopping-carts/' + cardId + '/items/' + productId);
  }

  private async updateItem(product: Product, change: number){
    let cartId = await this.getOrCreateCartId();

    //to keep symmetric of the code
    //adding item to a shopping cart
    //below line '/shopping-carts/' + cartId + '/items/' + product.$key, should not in the addToCart method
    //becaues this line make addToCart method to busy
    //so this line has be factored out to an individual method
    //let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + product.$key);
    let item$ = this.getItem(cartId, product.$key);

    item$.take(1).subscribe(item => {
      let quantity = (item.quantity || 0) + change;
      if(quantity === 0) item$.remove();
      else {

        // if(item.$exists()) {
        //   item$.update({ quantity: item.quantity + 1 });
        // } else {
        //   item$.set({ product:product, quantity : 1});
        // }
        //lots of "if...else if...else if" make code look less professional!!!
        //improved code below
        item$.update({ 
          //product: product, 
          title: product.title,
          unit: product.unit,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: quantity
        });
        //if item is not in the database, item.quantity is not a integer
      }
    });
  }
}
