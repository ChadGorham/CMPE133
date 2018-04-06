import { ShoppingCart } from '../../../shared/models/shopping-carts';
import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { PaymentService } from '../../../payments/payment.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart

  cart$: Observable<ShoppingCart>;

  handler: any;
  // the unit of amount is cent
  // ex. "amount = 1000", means $10.00 dollars
  amount = 0;

  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private paymentSvc: PaymentService,) {
this.afAuth.authState.subscribe((auth) => {
if (auth) this.userId = auth.uid
});
}
  

  async ngOnInit() 
  {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);

    // Getting total amount of price in shipping cart
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(cart => this.amount = cart.totalPrice * 100);


    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://image.flaticon.com/icons/svg/172/172119.svg',
      locale: 'auto',
      token: token => {
        // if token is accepted, do the following...
        this.paymentSvc.processPayment(token, this.amount);
        this.placeOrder();
      }
    });
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

    // create an order object with userID, shipping info and cart
    let order = new Order(this.userId, this.shipping, this.cart);

    console.log(order);

    // save order in Firebase
    let result = await this.orderService.placeOrder(order);

    // allows user to be redirected to order-success page
    this.router.navigate(['/order-success', result.key]);
  }

  //  processPayment(token: any, amount: number) {
  //    const payment = { token, amount }
  //    return this.db.list(`/payments/${this.userId}`).push(payment)
  //  }

  // Show up the pop up window for users
  // to enter the payment information
   handlePayment() {
    this.handler.open({
      name: 'MiniSafeway',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }

  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close();
    }
  

}
