import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { Role, User } from '../models/auth';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const flag = await this.authService.isAuthenticated();
    if (!flag) {
      return true;
    }
    this.authService.token = await this.authService.getToken();
    try {
      const res = await this.authService.getProfile().toPromise();
      return this.checkRole(route, res);
    } catch (e) {
      return true;
    }
  }

  private checkRole(route: ActivatedRouteSnapshot, user: User): boolean {
    if (user.account_type === Role.Student) {
      this.router.navigate(['/assignments']);
      return false;
    } else if (user.account_type === Role.Teacher) {
      this.router.navigate(['/exams']);
      return false;
    } else {
      return true;
    }
  }
}
