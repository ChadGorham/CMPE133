import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> { 
    return this.auth.appUser$
      //mapping a result boolean
      .map(appUser => appUser.isAdmin);
  }
} 
