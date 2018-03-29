import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../shared/models/product';

//for data table in admin product page
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  //products$;
  //cannot be obserable any more

  // //use the product object interface is better
  // //hold data of all products
  // products: Product[];
  // //hold data of filtered products
  // filteredProducts: any[];
  subscription: Subscription;

  displayedColumns = ['title', 'price', 'category', 'edit'];
  dataSource =  new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
    //use the subscribtion can prevent bad thing happen when user has 2 window opened, one is editting page
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.dataSource.data = products
      });
  }

  //if item is less then 1000, it is better just filtering on the client side
  //there is some tradeoff conditions here
  // filter(query: string){
  //   this.filteredProducts = (query) ?
  //     this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : //is user have a empty input go to below line
  //     this.products;
  // }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
