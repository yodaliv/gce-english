import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User } from '../models/auth';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.authService.token = await this.authService.getToken();
    const user = this.authService.user;
    if (user) {
      return this.checkRole(route, user);
    } else {
      return this.authService.getProfile().pipe(
        map(res => {
          return this.checkRole(route, res);
        }),
        catchError( () => {
          return of(false);
        })
      ).toPromise();
    }
  }

  private checkRole(route: ActivatedRouteSnapshot, user: User): boolean {
    if (route.data && route.data.role) {
      const found = route.data.role.find(x => x === user.account_type);
      return Boolean(found);
    } else {
      return true;
    }
  }
}
