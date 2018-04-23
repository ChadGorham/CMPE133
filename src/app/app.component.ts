import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if(!user) return;
        userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        // Make sure the user won't go back to the home page
        // if they refresh the page
        // only go back to home page first time
        if(!returnUrl) return;
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
    });
  }
}
