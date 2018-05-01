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
export class MakePaymentComponent{

  constructor() { }


}