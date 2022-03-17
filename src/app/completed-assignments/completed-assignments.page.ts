import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

import { Role } from '../core/models/auth';
import { Assignment } from '../core/models/assignment';
import { CommonService } from '../core/services/common.service';
import { AssignmentService } from '../core/services/assignment.service';
import { getCoverImage } from '../core/utils/common.util';
import { ExamService } from '../core/services/exam.service';
import { ScoreModalPage } from '../exam-play/score-modal/score-modal.page';
import { QuestionService } from '../core/services/question.service';
import { StudentAssignmentStats, StudentAssignment, StudentReport } from '../core/models/student';
import { StudentService } from '../core/services/student.service';

@Component({
  selector: 'app-completed-assignments',
  templateUrl: './completed-assignments.page.html',
  styleUrls: ['./completed-assignments.page.scss'],
})
export class CompletedAssignmentsPage implements OnInit {

  isLoading = false;
  Role = Role;

  slideOptions = {
    initialSlide: 0,
    centeredSlides: false,
    slidesPerView: 2,
    spaceBetween: 10,
    height: 300
  };

  pastAssignments: Assignment[] = [];
  pastAssignmentsTotal = 0;

  getCoverImage = getCoverImage;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private assignmentService: AssignmentService,
    private examService: ExamService,
    public alertController: AlertController,
    private modalController: ModalController,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.pastAssignments = [];
    try {
      await this.loadMorePastAssignments();
    } catch (e) {}
  }

  async doRefresh(event) {
    this.pastAssignments = [];
    try {
      await this.loadMorePastAssignments();
    } catch (e) {}
    event.target.complete();
  }

  private async getPastAssignments() {
    try {
      const practiceRes = await this.assignmentService.getPracticeAssignments(true, this.pastAssignments.length).toPromise();
      this.pastAssignmentsTotal = practiceRes.count;
      this.pastAssignments = this.pastAssignments.concat(practiceRes.results);
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load exams. Please try again.');
    }
  }

  async loadMorePastAssignments(event?) {
    try {
      await this.startLoading();
      await this.getPastAssignments();
      await this.endLoading();
    } catch (e) {}
    if (event) {
      event.target.complete();
    }
  }

  quizLabel(quizCount) {
    return quizCount === 1 ? 'Quiz' : 'Quizzes';
  }

  async startLoading() {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
  }

  async endLoading() {
    this.isLoading = false;
  }

  async reassignQuiz(examId, assignmentId) {
    const response: StudentReport = await this.questionService.getReport(examId, assignmentId).toPromise();
    const { correct, total, wrong, answered } = response;
    // NOTE: Need to ask for API change to pass skipped and score props.
    const skipped = total - (correct + wrong);
    const score = correct * 100 / total;
    const stats: StudentAssignmentStats = { correct, total, wrong, answered, skipped, score };
    this.openScoreModal(examId, stats);
  }

  async openScoreModal(id, stats) {
    const modal = await this.modalController.create({
      component: ScoreModalPage,
      swipeToClose: false,
      componentProps: {
        studentStats: stats,
        primaryBtnText: 'REDO QUIZ'
      }
    });
    const dismiss = modal.onWillDismiss();
    dismiss.then(async result => {
      if (result.data && result.data.primary) {
        const assignment = await this.examService.autoAssignExam(id).toPromise();
        this.router.navigate([`/exam-play/${id}/${assignment.id}`]);
      }
    });
    return await modal.present();
  }

}
