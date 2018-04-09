import { MakePaymentComponent } from './payments/make-payment/make-payment.component';
import { ShoppingModule } from './shopping/shopping.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng4-validators';
import { StarRatingModule } from 'angular-star-rating';


import { environment } from './../environments/environment';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from './shopping/components/products/product-filter/product-filter.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AuthGuard } from './shared/services/auth-guard.service';
import { ShippingFormComponent } from './shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';
import { SignupComponent } from './signup/signup.component';
import { WebLoginComponent } from './web-login/web-login.component';


import { PaymentService } from './payments/payment.service';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UnitService } from './unit.service';




@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,  
    LoginComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    SignupComponent,
    WebLoginComponent,
    MakePaymentComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    FormsModule,
    CustomFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StarRatingModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'web-login', component: WebLoginComponent },
      { path: 'signup', component: SignupComponent },

      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'profile-update', component: ProfileUpdateComponent, canActivate: [AuthGuard] },

      { path: 'payment', component: MakePaymentComponent},
      
      // Detail of my order
      { 
        path: 'my/orders/:id', 
        component: OrderDetailsComponent, 
        //check user login, then check admin login
        canActivate: [AuthGuard] 
      },

      { 
        path: 'admin/orders/:id', 
        component: OrderDetailsComponent, 
        //check user login, then check admin login
        canActivate: [AuthGuard, AdminAuthGuard]
      },

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
  providers: [
    PaymentService,
    UnitService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
