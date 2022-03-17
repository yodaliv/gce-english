import { Component, OnInit, ViewChild } from '@angular/core';
import { Observer } from 'rxjs';
import { Exam } from 'src/app/core/models/exam';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamInfoFormComponent } from '../exam-info-form/exam-info-form.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-exam-edit',
  templateUrl: './exam-edit.page.html',
  styleUrls: ['./exam-edit.page.scss'],
})
export class ExamEditPage implements OnInit {

  @ViewChild(ExamInfoFormComponent) form: ExamInfoFormComponent;

  exam: Exam = this.route.snapshot.data.exam;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  async save() {
    this.exam = await this.form.save();
    this.router.navigate(['exam-form', this.exam.id]);
  }

}
