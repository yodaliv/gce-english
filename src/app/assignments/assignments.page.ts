import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../core/models/auth';
import { CommonService } from '../core/services/common.service';
import { Assignment } from '../core/models/assignment';
import { AssignmentService } from '../core/services/assignment.service';

@Component({
  selector: 'app-exams',
  templateUrl: './assignments.page.html',
  styleUrls: ['./assignments.page.scss'],
})
export class AssignmentsPage implements OnInit {

  isLoading = false;
  Role = Role;

  slideOptions = {
    initialSlide: 0,
    centeredSlides: false,
    slidesPerView: 4,
    spaceBetween: 10,
    height: 300,
    breakpoints: {
      577: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      }
    }
  };


  testAssignments: Assignment[] = [];
  practiceAssignments: Assignment[] = [];

  testTotal = 0;
  practiceTotal = 0;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private assignmentService: AssignmentService
  ) { }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.testAssignments = [];
    this.practiceAssignments = [];
    try {
      await Promise.all([this.loadMorePractice(), await this.loadMoreTest()]);
    } catch (e) {}
  }

  async doRefresh(event) {
    this.testAssignments = [];
    this.practiceAssignments = [];
    try {
      await Promise.all([this.loadMorePractice(), await this.loadMoreTest()]);
    } catch (e) {}
    event.target.complete();
  }

  editExam(id, assignmentId) {
    this.router.navigate([`/exam-play/${id}/${assignmentId}`]);
  }

  private async getTests() {
    try {
      const testRes = await this.assignmentService.getTestAssignments(false, this.testAssignments.length).toPromise();
      this.testTotal = testRes.count;
      this.testAssignments = this.testAssignments.concat(testRes.results);
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load exams. Please try again.');
    }
  }

  private async getPractice() {
    try {
      const practiceRes = await this.assignmentService.getPracticeAssignments(false, this.practiceAssignments.length).toPromise();
      this.practiceTotal = practiceRes.count;
      this.practiceAssignments = this.practiceAssignments.concat(practiceRes.results);
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load exams. Please try again.');
    }
  }

  async loadMorePractice(event?) {
    try {
      await this.startLoading();
      await this.getPractice();
      await this.endLoading();
    } catch (e) {}
    if (event) {
      event.target.complete();
    }
  }

  async loadMoreTest(event?) {
    try {
      await this.startLoading();
      await this.getTests();
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
}
