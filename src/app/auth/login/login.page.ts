import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoginRequest, Role } from '../../core/models/auth';
import { AuthService } from '../../core/services/auth.service';
import { CommonService } from '../../core/services/common.service';
import { AccountTypeModalComponent } from './account-type-modal/account-type-modal.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  async login() {
    const loading = await this.commonService.showLoading('Please wait...');
    try {
      const payload: LoginRequest = this.form.value;
      await this.authService.login(payload);
      if (this.authService.user.account_type === Role.Teacher) {
        await this.router.navigate(['/exams'], {replaceUrl: true});
      } else {
        await this.router.navigate(['/assignments'], {replaceUrl: true});
      }
      // await this.commonService.showToast('Successfully logged in.');
    } catch (e) {
      await this.commonService.showToast('Sorry, invalid login credential.');
    } finally {
      await loading.dismiss();
    }
  }

  async register() {
    const modal = await this.modalController.create({
      component: AccountTypeModalComponent,
      cssClass: 'modal-bottom-option',
      swipeToClose: true,
    });
    await modal.present();
  }

}
