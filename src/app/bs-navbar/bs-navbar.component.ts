import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { AppUser } from '../shared/models/app-user';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../shared/models/shopping-carts';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase';
//import {Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  // make the user observable, in case of unsubscribe the user
  //$ tell everyone this variable is observable
  //user$: Observable<firebase.User>;

  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService,
              private shoppingCartService: ShoppingCartService) { 

  }

  // Intitialize all things in init at once
  // since constructor can't be async
  async ngOnInit()
  {
    //afAuth.authState.subscribe( user=> this.user = user);
    //this.user$ = auth.authState;
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    console.log(this.appUser);
    
    // calculate the total number of items in shopping cart
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
