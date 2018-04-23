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
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  
  
  
  slides: string[] = ["../assets/slides/Fresh.png","../assets/slides/Sale.jpg"]
  slideIndex = 1;
  currentImage: string = "";




  // Variables used by sorting
  viewby = 12;
  totalPages: Number;
  pageArr: Number[] = [];
  currentPage = 1;
  itemsPerPage = this.viewby;
  maxSize = 5; //Number of pager buttons to show

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) 
    {}

// Next/previous controls
plusSlides(n) {
  console.log(this.slideIndex);
  this.showSlides(this.slideIndex += n);
}

// Thumbnail image controls
currentSlide(n) {
  this.showSlides(this.slideIndex = n);
}

showSlides(n) 
{
  var i;
  if (n > this.slides.length) {this.slideIndex = 1} 
  if (n < 1) {this.slideIndex = this.slides.length}
  // for (i = 0; i < this.slides.length; i++) 
  // {
  //     this.slides[i].style.display = "none"; 
  // }
  // this.slides[this.slideIndex-1].style.display = "block"; 
} 





  // Set current page number
  setPage(pageNo) 
  {
    this.currentPage = pageNo;
    // console.log(this.currentPage);
  }

  // increasing or decreasing page number by 1
  IncOrDecPage(inc: Boolean)
  {
    // If the next button is clicked, and the current page has not reached the most
    if(inc === true && this.currentPage < this.totalPages)
      this.currentPage = this.currentPage + 1;
    
    // If the last button is clicked, and the current page is not one
    else if(inc === false && this.currentPage != 1)
      this.currentPage = this.currentPage - 1;
    else
      return;

  }
  

  // set number of items shown in a page
  setItemsPerPage(num) 
  {
    console.log(this.itemsPerPage);
    this.itemsPerPage = num;
    this.currentPage = 1; //reset to first page
    this.applyFilter();
    console.log(this.itemsPerPage);
  }

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

      // make the latest added products show first
      this.products.reverse();
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

      // the products will be list from high to low
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

      // the product will be listed from highest rating to lowest
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
    
    // Reset to one when the user clicks another category
    this.currentPage = 1;
    
    // Calculating total pages for displayed products
    this.totalPages = Math.ceil((this.filteredProducts.length / this.itemsPerPage));
    
    // Need to clear every time, or it will keep adding up when switching categories.
    this.pageArr = [];

    // Adding pageArr, so that it can be used to iterate over in html
    for(let i = 1; i <= this.totalPages; i++)
      this.pageArr.push(i);
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
    
    // Reset to one when the user clicks another category
    this.currentPage = 1;

    // Calculating total pages for displayed products
    this.totalPages = Math.ceil((this.filteredProducts.length / this.itemsPerPage));
    
    // Need to clear every time, or it will keep adding up when switching categories.
    this.pageArr = [];

    // Adding pageArr, so that it can be used to iterate over in html
    for(let i = 1; i <= this.totalPages; i++)
      this.pageArr.push(i);
  }
}
