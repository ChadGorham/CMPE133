import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'app';
  //inject auth service
  constructor(private userService: UserService, private auth: AuthService, router: Router){
    //every time login or logout, this observable admit a new value
    auth.user$.subscribe(user =>{
      if (user) {
        //when user login, store it into database
        userService.save(user);
        let returnUrl = localStorage.getItem('localUrl');
        router.navigateByUrl(returnUrl);
      }
      
    });

  }
}

//when the user logined, app can read the local storage
