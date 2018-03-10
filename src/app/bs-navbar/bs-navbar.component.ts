import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase';
//import {Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: AppUser;
  // make the user observable, in case of unsubscribe the user
  //$ tell everyone this variable is observable
  //user$: Observable<firebase.User>;

  constructor(private auth: AuthService) { 
    //afAuth.authState.subscribe( user=> this.user = user);
    //this.user$ = auth.authState;
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }

}
