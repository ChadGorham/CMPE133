import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-login',
  templateUrl: './web-login.component.html',
  styleUrls: ['./web-login.component.css']
})
export class WebLoginComponent {

  hasError: boolean;
  errorMsg: string;
  constructor(private router: Router,
              private auth: AuthService,  
              private afAuth: AngularFireAuth) { }

  webLogin(loginUser)
  {
    // This function is for login with account
    // that is registed in miniSafeway website only

    // Getting information from login form
    let email = loginUser.email;
    let password = loginUser.password

    // Authenticate the entered email and password with firebase
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((data) =>
      {
        this.router.navigate(['/profile']);
        console.log('You have successfully logged in');
      })
      .catch((error)=>
      {
        // "hasError" and "errorMessage" will be used in typescript
        // to display error message
        this.hasError = true; 
        this.errorMsg = error.message; 
        console.log(error.message);
      });
      
    
  }

}
