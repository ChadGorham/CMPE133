import { ShoppingCart } from '../../../shared/models/shopping-carts';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart
  shipping = {};
  userSubscription: Subscription;
  userId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService){}
  

  ngOnInit() 
  {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy()
  {
    this.userSubscription.unsubscribe();
  }

  

}
