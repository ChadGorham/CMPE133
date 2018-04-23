import { Component, OnInit } from '@angular/core';
import { CouponService } from '../coupon.service';

@Component({ 
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent {
    coupons$;
  
    constructor(private couponService: CouponService) { 
      this.coupons$ = couponService.getAll();
    }
}
