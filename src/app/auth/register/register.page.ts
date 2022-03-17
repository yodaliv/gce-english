import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonService } from '../../core/services/common.service';
import { confirmPasswordValidator } from '../../core/utils/validator.util';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', Validators.required],
    nickname: [''],
    account_type: ['', Validators.required],
    birth_date: null,
    password1: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required, confirmPasswordValidator]],
  });

  // optional invite key
  inviteKey: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form.get('account_type').setValue(this.route.snapshot.params.role);
    this.route.queryParams.subscribe(params => {
      this.inviteKey = params.inviteKey;
      if (params.e) {
        this.form.get('email').setValue(params.e);
      }
    });
  }

  ngOnInit() {
  }

  async register() {
    const loading = await this.commonService.showLoading('Please wait...');
    try {
      await this.authService.register({ ...this.form.value, invite_key: this.inviteKey });
      await this.router.navigate(['/signup-welcome']);
    } catch (e) {
      let message = '';
      if (e.error && e.error.password1) {
        message = e.error.password1[0];
      } else if (e.error && e.error.name) {
        message = 'Name can not be empty.';
      } else {
        message = 'Sorry, Failed to register your account.';
      }
      await this.commonService.showToast(message);
    } finally {
      await loading.dismiss();
    }
  }

}
