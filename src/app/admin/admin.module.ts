import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    BrowserAnimationsModule,
    RouterModule.forChild([

      // Specific route should be on top
      // and general route should be at the bottom
      { 
        path: 'admin/products/new', 
        component: ProductFormComponent, 
        //check user login, then check admin login
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      {
        // Look for parater for id to edit a product 
        path: 'admin/products/:id', 
        component: ProductFormComponent, 
        //check user login, then check admin login
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        //check user login, then check admin login
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/orders', 
        component: AdminOrdersComponent, 
        //check user login, then check admin login
        canActivate: [AuthGuard, AdminAuthGuard] 
      }
    ])  
  ],
  declarations: 
  [
    ProductFormComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
  ],
  providers: [
    AdminAuthGuard,
  ]
})
export class AdminModule { }
