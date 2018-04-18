// import { Component, OnInit } from '@angular/core';
// import { CouponService } from '../../../coupon.service';

// @Component({
//   selector: 'app-admin-coupon',
//   templateUrl: './admin-coupon.component.html',
//   styleUrls: ['./admin-coupon.component.css']
// })
// export class AdminCouponComponent{
//   coupons$;
 
//   constructor(private couponService: CouponService) { 
  
//     this.coupons$ = couponService.getAll();
//   }

// }

import { Component, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { Coupon } from 'shared/models/coupon';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { CouponService } from '../../../coupon.service';
 
@Component({
  selector: 'app-admin-coupon',
  templateUrl: './admin-coupon.component.html',
  styleUrls: ['./admin-coupon.component.css']
})
export class AdminCouponComponent implements OnDestroy {
 
  subscription: Subscription;
 
  displayedColumns = ['coupon', 'discount', 'edit'];
  dataSource =  new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor(private couponService: CouponService) { 
    this.subscription = this.couponService.getAll()
    .subscribe(coupons => {
      this.dataSource.data = coupons;
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
