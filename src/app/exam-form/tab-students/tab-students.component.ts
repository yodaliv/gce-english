import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CommonService } from '../../core/services/common.service';
import { StudentService } from '../../core/services/student.service';
import { StudentAssignment } from './../../core/models/student';
import { ExamStudentStatsPage } from './../exam-student-stats/exam-student-stats.page';


@Component({
  selector: 'app-tab-students',
  templateUrl: './tab-students.component.html',
  styleUrls: ['./tab-students.component.scss'],
})
export class TabStudentsComponent implements OnInit {

  total = 0;
  isLoading = false;
  students: StudentAssignment[] = [];
  examId = this.route.parent.snapshot.params.id;

  constructor(
    private commonService: CommonService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.startFetching();
  }

  startFetching() {
    this.total = 0;
    this.students = [];
    this.loadStudents();
  }

  async loadStudents() {
    try {
      this.isLoading = true;
      const res = await this.studentService.getAssignedStudentsByExamId(this.examId, this.students.length).toPromise();
      this.total = res.count;
      this.students = this.students.concat(res.results);
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load students. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  async loadMore(event) {
    await this.loadStudents();
    event.target.complete();
  }

  async openScore(student: StudentAssignment) {
    const stats = student.stats;
    if (!stats.score) {
      return;
    }
    const modal = await this.modalController.create({
      component: ExamStudentStatsPage,
      swipeToClose: false,
      componentProps: {
        studentStats: stats,
        studentDetails: student.student_details,
        assignmentId: student.id,
        examId: this.examId
      }
    });
    const dismiss = modal.onWillDismiss();
    dismiss.then((result: any) => {
      if (result.data && result.data.reassign) {
        this.openSuccessModal();
        this.startFetching();
      }
    });
    return await modal.present();
  }

  openSuccessModal() {
    this.commonService.openSuccessModal(
      'Yay!',
      'You have successfully assigned your test',
      'VIEW QUIZ'
    );
  }
}
