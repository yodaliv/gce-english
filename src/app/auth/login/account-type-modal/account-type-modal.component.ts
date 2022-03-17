import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Role } from '../../../core/models/auth';
import { slideUpAnimation } from '../../../core/utils/animation.util';

@Component({
  selector: 'app-account-type-modal',
  templateUrl: './account-type-modal.component.html',
  styleUrls: ['./account-type-modal.component.scss'],
  animations: [
    slideUpAnimation()
  ],

})
export class AccountTypeModalComponent implements OnInit {

  Role = Role;

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  selectRole(role: Role) {
    this.modalController.dismiss();
    this.router.navigate(['register', role]);
  }

}
