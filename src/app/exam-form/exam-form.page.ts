import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Exam } from '../core/models/exam';
import { ExamInfoFormComponent } from './exam-info-form/exam-info-form.component';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.page.html',
  styleUrls: ['./exam-form.page.scss'],
})
export class ExamFormPage implements OnInit {

  @ViewChild(ExamInfoFormComponent) infoForm: ExamInfoFormComponent;
  exam: Exam = this.route.snapshot.data.exam;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }
}
