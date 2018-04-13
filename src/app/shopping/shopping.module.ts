import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'check-out', component: CheckOutComponent},
      { path: 'order-success/:id', component: OrderSuccessComponent},
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
            
      // add to app.moudule.ts
      {
        //displaying a simgle product
        // Look for parameter for id to edit a product 
        path: 'product/:id', 
        component: ProductComponent,
      },
    ])
  ],
  declarations: [
    ProductFilterComponent,
    ProductComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ]
})
export class ShoppingModule { }
