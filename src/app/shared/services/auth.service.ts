import { UserService } from './user.service';
import { AppUser } from '../models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'; 
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  //this a not a proper abstraction, should firebase user class to your own user class
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute,
    private router: Router) { 
    this.user$ = afAuth.authState;    
  }


  login() 
  { 
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
      
    
  }

  facebookLogin()
  {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  logout() 
  { 
    this.afAuth.auth.signOut();
    
    // Redirect user to home page when logged out
    this.router.navigate(['/']);
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
      //map and switch to a observable, return from a user service a get method 
      .switchMap(user => {
        if (user) 
        {
          return this.userService.get(user.uid);         
        }

        return Observable.of(null);
      });    
  }
}
