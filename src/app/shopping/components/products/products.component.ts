import 'rxjs/add/operator/switchMap';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from 'shared/models/shopping-carts';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import * as firebase from 'firebase';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[]
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) 
    {}
  
  async ngOnInit() 
  {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts()
  {
    // populating product
    this.productService
    .getAll()
    .switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      
      // Setting filtered products array
      this.applyFilter();     
    });
  }

  private applyFilter()
  {
    this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
  }

  titleFilter(filteredValue: string)
  {
    // it's easier to compared when all characters are lower case and no space
    filteredValue = filteredValue.toLowerCase().trim();

    // Setting filtered products array
    this.filteredProducts = (filteredValue) ?

      // "indexOf" function will return -1 if no matches in search box
      // else, it will return the position of the character in the title of products
      this.products.filter(p => p.title.toLowerCase().indexOf(filteredValue) > -1) :
      this.products;
  }
}
