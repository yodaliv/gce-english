import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonService } from '../../core/services/common.service';
import { StudentService } from '../../core/services/student.service';
import { slideUpAnimation } from '../../core/utils/animation.util';

@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.component.html',
  styleUrls: ['./invite-modal.component.scss'],
  animations: [slideUpAnimation()]
})
export class InviteModalComponent implements OnInit {

  form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private studentService: StudentService,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async invite() {
    const loading = await this.commonService.showLoading('Sending invite...');
    try {
      await this.studentService.inviteStudentByEmail(this.form.value.email).toPromise();
      this.commonService.openSuccessModal(
        'Congratulations!',
        `You have successfully invited ${this.form.value.email}`,
        '/students'
      );
      this.modalController.dismiss();
    } catch (e) {
      let message = 'Sorry, failed to send invitation. Please try again.';
      if (e && e.error && e.error.email && e.error.email.email) {
        message = e.error.email.email;
      }
      this.commonService.showToast(message);
    } finally {
      await loading.dismiss();
    }
  }

}
