import { Component, OnInit } from '@angular/core';
import { AppUser } from '../shared/models/app-user';
import { AuthService } from '../shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent {
  appUser: AppUser;
  updatedName: string;
  constructor(private auth: AuthService,
              private afAuth: AngularFireAuth,
              private router: Router) 
  {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  updateInfo(newInfo)
  {
    // Getting current login user
    let currUser = firebase.auth().currentUser;

    // Go to the reference category to update,
    // in this case, it will be "users"
    let ref = firebase.database().ref("users");

    // Getting information in from the form
    let userId = currUser.uid;
    let updatedName = newInfo.name;
    let updatedAddress = newInfo.address;
    let updatedProfilePicture = newInfo.profile_picture;


    // Create new set of data with
    // updated address, name, profile_picture
    var newData = {
      name: updatedName,
      address: updatedAddress,
      profile_picture: updatedProfilePicture
    };

    currUser.updateProfile
    (
      {
        displayName: updatedName,
        photoURL: updatedProfilePicture
      }
    )


    // go to desired user location to update the information
    ref.child(userId).once("value", function (snapshot) {
        ref.child(userId).update(newData);
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    this.router.navigate(['/profile']);
  }


}
