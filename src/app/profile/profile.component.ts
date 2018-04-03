import { Component } from '@angular/core';

import { AppUser } from '../shared/models/app-user';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  appUser: AppUser;
  constructor(private auth: AuthService) 
  {            
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    console.log(this.appUser);
  }

}
