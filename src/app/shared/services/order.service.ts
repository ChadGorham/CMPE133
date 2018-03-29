import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppingCartService: ShoppingCartService) { }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrders() { 
    return this.db.list('/orders');
  }
  
  getOrder(orderId){
    return this.db.object('/orders/' + orderId);
  }

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', {
      query: {
        //when filtering data from database always use below 2 lines
        orderByChild: 'userId',
        equalTo: userId    //or startAt, endAt    
      }
    });
  }
}
