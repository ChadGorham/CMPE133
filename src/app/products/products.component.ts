import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  //put all products in an array so we can filter out
  //make sure you initialize the array
  products: Product[] = [];
  //hold the filtered products
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit(){
    //to implement the async, must use interface 
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts(){
    this.productService
    .getAll()
    .switchMap(products => {
      //this line must go first
      this.products = products;
      return this.route.queryParamMap;
    })

    //cannot use snapshot
    //route.snapshot.queryParamMap
    .subscribe(params =>{
      //high light the selected category tab in the products page
      this.category = params.get('category');
      this.applyFilter();
    });
  }
  

  private applyFilter(){
    //setting the filtered products array
    // in template use the filteredProducts to render
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
