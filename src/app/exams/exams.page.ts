import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Role } from '../core/models/auth';
import { Exam } from '../core/models/exam';
import { AuthService } from '../core/services/auth.service';
import { CommonService } from '../core/services/common.service';
import { ExamService } from '../core/services/exam.service';
import { Pagination } from '../core/models/pagination';


@Component({
  selector: 'app-exams',
  templateUrl: './exams.page.html',
  styleUrls: ['./exams.page.scss'],
})
export class ExamsPage implements OnInit {

  isLoading = false;
  total = 0;
  exams: Exam[] = [];
  Role = Role;

  constructor(
    private examService: ExamService,
    private commonService: CommonService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  async doRefresh(event) {
    this.exams = [];
    try {
      await this.getTests();
    } catch (e) {}
    event.target.complete();
  }

  ionViewWillEnter() {
    this.exams = [];
    this.getTests();
  }

  editExam(id) {
    if (this.authService.user.account_type === Role.Teacher) {
      this.router.navigate([`/exam-form/${id}`]);
    } else {
      this.router.navigate([`/exam-play/${id}`]);
    }
  }

  private async getTests(): Promise<Pagination<Exam> | boolean> {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;
    try {
      const res = await this.examService.getExams(this.exams.length).toPromise();
      this.total = res.count;
      this.exams = this.exams.concat(res.results);
      return res;
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load exams. Please try again.');
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  async loadMore(event) {
    await this.getTests();
    event.target.complete();
  }

  quizLabel(quizCount) {
    return quizCount === 1 ? 'Quiz' : 'Quizzes';
  }

  questionCount(exam) {
    if (!isNaN(exam.questions_count)) {
      return exam.questions_count;
    } else if (exam.questions) {
      return exam.questions.length;
    }
  }
}
