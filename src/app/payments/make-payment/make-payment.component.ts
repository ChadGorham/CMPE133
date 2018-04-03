import { OrderService } from './../../shared/services/order.service';
import { Component, OnInit, HostListener, Input, OnDestroy } from '@angular/core';
import { PaymentService } from '../payment.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-carts';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from 'shared/services/auth.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit, OnDestroy {

  cart$: Observable<ShoppingCart>;
  handler: any;
  // the unit of amount is cent
  // ex. "amount = 1000", means $10.00 dollars
  amount = 0;

  @Input('cart') cart: ShoppingCart
  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(private paymentSvc: PaymentService,
              private shoppingCartService: ShoppingCartService,
              private authService: AuthService,
              private orderService: OrderService,
              private router: Router) { }

  async ngOnInit() {
    // Getting total amount of price in shipping cart
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(cart => this.amount = cart.totalPrice * 100);

    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://image.flaticon.com/icons/svg/172/172119.svg',
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.amount);
      }
    });
    
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
  }

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