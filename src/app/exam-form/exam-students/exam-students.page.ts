import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { ExamAssignedPipe } from '../../ui-kit/pipes/exam-assigned.pipe';


@Component({
  selector: 'app-exam-students',
  templateUrl: './exam-students.page.html',
  styleUrls: ['./exam-students.page.scss'],
  providers: [ExamAssignedPipe]
})
export class ExamStudentsPage implements OnInit {

  @Input() examId = this.route.snapshot.params.id;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    console.log(this.examId);
  }

  finishHandler() {
    this.commonService.openSuccessModal(
      'Yay!',
      'You have successfully assigned your test',
      `/exam-form/${this.examId}`,
      'VIEW QUIZ'
    );
  }

}
