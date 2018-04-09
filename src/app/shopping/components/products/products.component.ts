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

  // Sorting function 
  private sortBy(command: string)
  {
    
    if(command == "orderByPriceDesc")
      this.populateProductsByPrice(true);
    else if(command == "orderByPriceAsc")
      this.populateProductsByPrice(false);
    else if(command == "orderByRating")
      this.populateProductsByRating();
    else
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

  // get product list in order of price
  private populateProductsByPrice(desc: boolean)
  {
    // populating product
    this.productService
    .getAllByPrice()
    .switchMap(products => {
      this.products = products;
      if(desc === true)
        this.products.reverse();
      return this.route.queryParamMap;
    })
    .subscribe(params => {
      this.category = params.get('category');
      
      // Setting filtered products array
      this.applyFilter();     
    });
  }

  // get product list in order of ratings
  private populateProductsByRating()
  {
    // populating product
    this.productService
    .getAllByRating()
    .switchMap(products => {
      this.products = products;
      this.products.reverse();
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
