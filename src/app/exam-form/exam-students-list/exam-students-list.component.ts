import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Student } from 'src/app/core/models/auth';
import { CommonService } from 'src/app/core/services/common.service';
import { StudentService } from 'src/app/core/services/student.service';
import { ExamAssignedPipe } from 'src/app/ui-kit/pipes/exam-assigned.pipe';

@Component({
  selector: 'app-exam-students-list',
  templateUrl: './exam-students-list.component.html',
  styleUrls: ['./exam-students-list.component.scss'],
})
export class ExamStudentsListComponent implements OnInit {

  @Input() examId;
  @Input() buttonLabel = 'ASSIGN';
  @Output() buttonClicked = new EventEmitter();

  total = 0;
  isLoading = false;
  students: Student[] = [];
  search = '';

  original: any = {};
  updates: any = {};

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private commonService: CommonService,
    private examAssignedPipe: ExamAssignedPipe,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.students = [];
    this.loadStudents();
  }

  doSearch(search) {
    this.search = search;
    this.students = [];
    this.loadStudents();
  }

  assignChanged(isChecked: boolean, id: string) {
    this.updates[id] = isChecked;
  }

  async loadStudents() {
    try {
      this.isLoading = true;
      const res = await this.studentService.getStudents(this.students.length, 10, this.search).toPromise();
      this.total = res.count;
      this.students = this.students.concat(res.results);
      this.students.forEach(student => {
        if (this.examAssignedPipe.transform(student.assigned_exams, this.examId)) {
          this.original[student.id] = true;
        }
      });
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load students. Please try again.');
    }
  }

  async loadMore(event) {
    await this.loadStudents();
    event.target.complete();
  }

  async submit() {
    const added = [];
    const deleted = [];
    Object.keys(this.updates).map(id => {
      if (this.updates[id] === true) {
        if (!this.original[id]) {
          added.push(id);
        }
      } else {
        if (this.original[id]) {
          deleted.push(id);
        }
      }
    });
    const loading = await this.commonService.showLoading('Saving assignments...');
    try {
      if (added && added.length) {
        await this.studentService.saveAssignments(this.examId, added.map(x => ({student: x}))).toPromise();
      }
      if (deleted && deleted.length) {
        await this.studentService.deleteAssignment(this.examId, deleted).toPromise();
      }
      this.buttonClicked.emit();
    } catch (e) {
      this.commonService.showToast('Sorry, failed to save assignment. Please try again.');
    } finally {
      await loading.dismiss();
    }
  }

}
