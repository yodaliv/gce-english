import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/core/services/common.service';
import { StudentService } from 'src/app/core/services/student.service';
import { Student } from './../../core/models/auth';
import { StudentAssignmentStats } from './../../core/models/student';

@Component({
  selector: 'app-exam-student-stats',
  templateUrl: './exam-student-stats.page.html',
  styleUrls: ['./exam-student-stats.page.scss'],
})
export class ExamStudentStatsPage implements OnInit {

  @Input() studentStats: StudentAssignmentStats;
  @Input() studentDetails: Student;
  @Input() examId: string;
  @Input() assignmentId: string;
  @Input() email: string;

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
    private router: Router,
    private commonService: CommonService,
    private studentService: StudentService,
  ) {
  }

  ngOnInit() {
  }

  onBack() {
    this.modalCtrl.dismiss();
  }

  async reassign() {
    const loading = await this.commonService.showLoading('Saving assignments...');
    let reassigned = false;
    try {
      await this.studentService.saveAssignments(this.examId, [{ student: this.studentDetails.id }]).toPromise();
      reassigned = true;
    } catch (e) {
      this.commonService.showToast('Sorry, failed to assign exam to the student. Please try again.');
    } finally {
      loading.dismiss();
      this.modalCtrl.dismiss({ reassign: reassigned });
    }
  }

  review() {
    this.router.navigate(['exam-review', this.examId, this.assignmentId]);
    this.modalCtrl.dismiss();
  }

}
