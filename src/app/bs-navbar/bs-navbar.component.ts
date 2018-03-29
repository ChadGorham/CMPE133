import { AppUser } from '../shared/models/app-user';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { ShoppingCart } from '../shared/models/shopping-cart';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase';
import {Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  // make the user observable, in case of unsubscribe the user
  //$ tell everyone this variable is observable
  //user$: Observable<firebase.User>;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { 
  }

  async ngOnInit(){
    //afAuth.authState.subscribe( user=> this.user = user);
    //this.user$ = auth.authState;
    //better code below
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
