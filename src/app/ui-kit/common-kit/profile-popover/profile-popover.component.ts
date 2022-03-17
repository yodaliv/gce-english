import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { AuthService } from '../../../core/services/auth.service';
import { Role } from 'src/app/core/models/auth';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
})
export class ProfilePopoverComponent {

  user$ = this.authService.userChanged$;
  Role = Role;

  constructor(
    private router: Router,
    private authService: AuthService,
    public popoverController: PopoverController
  ) {}

  gotoProfile() {
    this.router.navigate(['/profile'], {replaceUrl: true});
    this.popoverController.dismiss();
  }

  logout() {
    this.authService.logout();
    this.popoverController.dismiss();
  }
}
