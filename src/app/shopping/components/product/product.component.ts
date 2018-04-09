import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCart } from 'shared/models/shopping-carts';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input('product') product;
  // decide if "add to cart" button is shown or not
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(
    private productService: ProductService,
    //private router: Router,
    //can read route parameter
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
) {
        // get the id from snapshot
        let id = this.route.snapshot.paramMap.get('id');

        if(id){
          this.productService.get(id).take(1).subscribe( p => this.product = p);
        }

   }

  addToCart()
  {
    this.cartService.addToCart(this.product);
  }
}


