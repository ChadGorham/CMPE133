import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMsg: string;
  hasError: boolean;
  constructor(private auth: AuthService,  
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router) {}
    
  signup(NewUser)
  {
    // Gettin information from sign up form
    let userEmail = NewUser.email;
    let userPassword = NewUser.password;
    let userName = NewUser.name;
    let photoUrl = NewUser.ImageUrl;
    let userAddress = NewUser.address;
    let isAdmin = false;

    console.log(userEmail,userName, photoUrl,userAddress);

    // Create a user with input email and password
    this.afAuth.auth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then( (user) =>
      {        
        // Associate name to the set of email and password
        user.updateProfile({
            displayName: userName,
            photoURL: photoUrl
        });
            
        // Did not follow the way that is done on udemy
        // Instead, it was written from documentation
        // from Firebase website        
        firebase.database().ref('users/' +user.uid).update({
          name: userName,
          email: userEmail,
          profile_picture: photoUrl,
          address: userAddress,
          isAdmin: isAdmin
        });
        

        // For some reason, the "name" property will not be stored until the page refreshed
        // reload the profile page to make it show name
        // "navigate" function does not work here because it does not reload
        window.location.href = '/profile';
      })
      .catch((error)=>
      {
        // "hasError" and "errorMsg" will be used in typescript for signup.ts
        this.hasError = true; 
        this.errorMsg = error.message; 
        console.log(error.message);
      });
  }
}
