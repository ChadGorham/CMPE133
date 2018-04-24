import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router, ActivatedRoute } from '@angular/router';
//only take 1 item, and this item will automatically complete
//thus no need to unsubscrible
import 'rxjs/operator/take';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent{
  orders$; 
  product:Product;
  @Input('order') order;

  //tabe orderId parameter then get the order from firebase
  constructor(
    private orderService: OrderService, 
    private db:AngularFireDatabase,
    private router: Router,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    //can read route parameter
    private route: ActivatedRoute
  ) { 
    this.orders$ = orderService.getOrders();

    // get the id from snapshot
    let id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.orderService.getOrder(id).take(1).subscribe( o => this.order = o);
    }
  }

  addToCartWithProductKey(key: string){
    console.log("testing" + key);
    if (key) this.productService.get(key).take(1).subscribe(p => this.product = p);
    this.shoppingCartService.addToCart(this.product);
  }

}