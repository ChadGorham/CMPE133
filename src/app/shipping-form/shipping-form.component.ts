import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { OrderService } from '../shared/services/order.service';
import { Order } from '../shared/models/order';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {}; 
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService){

  }

  ngOnInit() {
    //store the current user id in this class
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  } 

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);

    //must call below line from OrderService
    //this.shoppingCartService.clearCart();

    //direct the user after sucessfully check out
    //$key: read a node from firebase
    //key: store something in firebase
    this.router.navigate(['/order-success', result.key]);
  }  

}
