import { Order } from '../../shared/models/order';
import { OrderService } from '../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(private orderService: OrderService) { 
    this.orders$ = orderService.getOrders(); 
  }
}


