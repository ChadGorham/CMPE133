import { Component, ViewChild } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'shared/models/product';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
 
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
 
  subscription: Subscription;
 
  displayedColumns = ['title', 'price', 'edit'];
  dataSource =  new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor(private productService: ProductService) { 
    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.dataSource.data = products;
    });
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