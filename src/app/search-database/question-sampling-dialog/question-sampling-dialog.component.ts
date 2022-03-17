import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { slideUpAnimation } from '../../core/utils/animation.util';
import { DefaultSearchQuestionLimit } from '../../core/models/category';

@Component({
  selector: 'app-question-sampling-dialog',
  templateUrl: './question-sampling-dialog.component.html',
  styleUrls: ['./question-sampling-dialog.component.scss'],
  animations: [
    slideUpAnimation()
  ],
})
export class QuestionSamplingDialogComponent implements OnInit {

  @Input() limit: number;

  form: FormGroup = this.fb.group({
    limit: [this.limit || DefaultSearchQuestionLimit, [Validators.required, Validators.min(1)]]
  });

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.form.get('limit').setValue(this.limit);
  }

  selectLimit() {
    this.modalController.dismiss(this.form.value);
  }

}
