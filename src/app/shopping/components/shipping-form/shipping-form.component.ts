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
import { CouponService } from '../../../coupon.service';
import * as firebase from 'firebase';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart

  cart$: Observable<ShoppingCart>;
  inputCouponCode: string = "";
  //0 means 0% off. 50 means 50% off.
  discount: number = 0;

  handler: any;
  // the unit of amount is cent
  // ex. "amount = 1000", means $10.00 dollars
  amount: number = 0;

  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private paymentSvc: PaymentService,
    private couponService: CouponService
  ) {
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

  //vertify the coupon code
  //if the code matches the codes in firebase, apply the discount
  //by updating the local discount variable
  applyCoupon()
  {
    const database = firebase.database();  // store database in a variable
    const ref = database.ref('coupons');  // refrence to the coupons branch
    console.log(database);
    // need to compare with existing coupon code in firebase
    this.cart$.subscribe(cart => this.cart = cart);
    let validation = false;
    let couponDiscount = 1;
    let couponMessage = '';
    let couponList;
    let coupons$ = this.couponService.getAll();
    coupons$.subscribe(coupons => {
      couponList = coupons;
      console.log('inside' , couponList);
      const keys = Object.keys(couponList);
    // console.log(keys);
      for (let i = 0; i < keys.length; i++)
      {
        let k = keys[i];
        let couponCode = couponList[k].coupon;
        let discountAmount = couponList[k].discount;
        // couponMessage += 'Coupon: ' + couponCode + '  Discount: ' + discountAmount + '%' + '\n';
        if (this.inputCouponCode === couponCode)
        {
          alert('Thank you for using coupon');
          validation = true;
          this.discount = discountAmount;

          this.cart$.subscribe(cart => this.amount = cart.totalPrice * (100-this.discount)/100 * 100);
          
        }
      }
      if (!validation)
        alert('Please input valid coupon');
    });
    console.log('final',this.cart);


    // clear the coupon
    //  document.getElementById('couponCodeInput').value = '';
  }


  async placeOrder() 
  {
    // Getting total amount of price in shipping cart
    this.cart$ = await this.shoppingCartService.getCart();
    this.cart$.subscribe(cart => this.cart = cart);

    

    // create an order object with userID, shipping info and cart
    let order = new Order(this.userId, this.shipping, this.cart);

    order.purchasePrice = order.purchasePrice * (100-this.discount)/100;

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
      name: 'E-Quality',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }

  @HostListener('window:popstate')
    onPopstate() {
      this.handler.close();
    }
  

}
