import { Observable } from 'rxjs/Observable';
import { OrderService } from 'shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Order } from 'shared/models/order';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent{

  orders$;

  constructor(private orderService: OrderService,
              private authService: AuthService,) 
              { 
                this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid));
              }
}
