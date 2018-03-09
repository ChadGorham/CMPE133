//import {Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{
  // make the user observable, in case of unsubscribe the user
  //$ tell everyone this variable is observable
  //user$: Observable<firebase.User>;

  constructor(public auth: AuthService) {
    //afAuth.authState.subscribe( user=> this.user = user);
    //this.user$ = auth.authState;
  }

  logout(){
    this.auth.logout();
  }

}
