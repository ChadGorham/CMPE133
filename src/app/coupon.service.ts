import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Coupon } from 'shared/models/coupon';

@Injectable() 
export class CouponService {

  constructor(private db:AngularFireDatabase) { }

  // get all products listed in firebase
  getAll()
  {
    return this.db.list('/coupons');
  }

  create(coupon: Coupon)
  {
    // Create the coupon and save it in Firebase
    // description, review, and rating are optional
    // 
    coupon.description = coupon.description || "";
    coupon.discount = coupon.discount || 0;
    coupon.coupon = coupon.coupon || "";
    return this.db.list('/coupons').push(coupon);
  } 

  update(couponId, coupon)
  {
    // when you passed parameter in update()
    // firebase won't let you do it because
    // id should not be changed or updated
    return this.db.object('/coupons/' + couponId).update(coupon);
  }

  // retrieve coupon with given id
  get(couponId)
  {
    return this.db.object('/coupons/' + couponId);
  }
  
  delete(couponId)
  {
    return this.db.object('/coupons/' + couponId).remove();
  }

}
