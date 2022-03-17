import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { ProfilePopoverComponent } from '../profile-popover/profile-popover.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Role } from 'src/app/core/models/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() backUrl: string;
  @Input() hideProfile = false;
  @Input() hideSidebar = true;
  @Input() noTitle = false;
  @Input() userRole;

  constructor(
    public popoverController: PopoverController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    switch (this.authService.user.account_type) {
      case Role.Student:
        this.userRole = 'Student';
        break;
      case Role.Teacher:
          this.userRole = 'Teacher';
          break;
    }
  }

  async profileClick(ev) {
    const popover = await this.popoverController.create({
      component: ProfilePopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
