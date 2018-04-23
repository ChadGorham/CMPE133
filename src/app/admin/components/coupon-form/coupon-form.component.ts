import { Component } from '@angular/core';
import { CouponService } from '../../../coupon.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrls: ['./coupon-form.component.css']
})
export class CouponFormComponent {
  id;
  targetCoupon = {};

  constructor(
    private router: Router,
    //for reading the route id
    private route: ActivatedRoute,
    private couponService: CouponService
  ) { 
    // retrieve id of coupon from the address 
    this.id = this.route.snapshot.paramMap.get('id'); 

    // noted that only takes one item, so we don't need to unsubscribe
    if (this.id) this.couponService.get(this.id).take(1).subscribe(c => this.targetCoupon = c);
  }

  save(coupon) 
  {
    if(this.id) this.couponService.update(this.id, coupon);
    else this.couponService.create(coupon); 
    
    this.router.navigate(['/admin/coupon']);
  }

  delete()
  {
    // simple javascript confirm box
    if(confirm('Are you sure you want to delete this coupon?'))
    {
      this.couponService.delete(this.id);
      this.router.navigate(['/admin/coupon']);
    }
  }

}
