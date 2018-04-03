import { ShoppingCartService } from './../shared/services/shopping-cart.service';
import { Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-carts';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PaymentService implements OnInit, OnDestroy{

  userId: string;


  cart$: Observable<ShoppingCart>;
  cart: ShoppingCart
  shipping = {};
  userSubscription: Subscription;

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              private router: Router,
              private authService: AuthService,
              private orderService: OrderService,
              private shoppingCartService: ShoppingCartService) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) this.userId = auth.uid
    });
  }

  ngOnInit()
  {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() 
  {
    // Getting total amount of price in shipping cart
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(cart => this.cart = cart);

    let order = new Order(this.userId, this.shipping, this.cart);
    
    let result = await this.orderService.placeOrder(order);

    // allows user to be redirected to order-success page
    this.router.navigate(['/order-success', result.key]);
  }

   processPayment(token: any, amount: number) {
     this.placeOrder();
     const payment = { token, amount }
     return this.db.list(`/payments/${this.userId}`).push(payment)
   }

}