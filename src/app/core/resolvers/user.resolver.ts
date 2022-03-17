import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../models/auth';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
    if (this.authService.user && this.authService.user.account_type) {
      return this.authService.user;
    } else {
      return new Promise(async (resolve) => {
        try {
          this.authService.token = await this.authService.getToken();
          const res = await this.authService.getProfile().toPromise();
          resolve(res);
        } catch (e) {
          this.router.navigate(['/login']);
          resolve();
        }
      });
    }
  }
}
