import { Component, OnInit } from '@angular/core';
//import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  //constructor(private afAuth: AngularFireAuth) { }
  constructor(private auth: AuthService) { }

  facebookLogin()
  {
    this.auth.facebookLogin();
  }


  login(){
    //there is testbility problem below when do the unit test, we dont want to go firebase
    //this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.auth.login();
    
  }

}
