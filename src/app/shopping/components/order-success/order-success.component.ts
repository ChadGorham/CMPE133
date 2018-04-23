import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
//only take 1 item, and this item will automatically complete
//thus no need to unsubscrible
import 'rxjs/operator/take';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent{
  orders$;
  @Input('order') order;

  //tabe orderId parameter then get the order from firebase
  constructor(
    private orderService: OrderService, 
    private db:AngularFireDatabase,
    private router: Router,
    //can read route parameter
    private route: ActivatedRoute,

  ) { 
    this.orders$ = orderService.getOrders();

    // get the id from snapshot
    let id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.orderService.getOrder(id).take(1).subscribe( o => this.order = o);
      console.log(this.order);
    }
  }
}