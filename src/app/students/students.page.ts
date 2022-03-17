import { BehaviorSubject, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Student } from '../core/models/auth';
import { CommonService } from '../core/services/common.service';
import { StudentService } from '../core/services/student.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit, OnDestroy {

  search = '';
  total = 0;
  students: Student[] = [];
  isLoading = false;

  private unsubscribeStudent$: Subject<any> = new Subject<any>();

  constructor(
    private commonService: CommonService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.studentService.invited$.pipe(
      takeUntil(this.unsubscribeStudent$)
    ).subscribe( () => {
      this.startStudentList();
    });
  }

  startStudentList() {
    this.total = 0;
    this.students = [];
    this.loadStudents();
  }

  doSearch(search: string) {
    this.search = search;
    this.students = [];
    this.loadStudents();
  }

  private async loadStudents() {
    try {
      this.isLoading = true;
      const res = await this.studentService.getStudents(this.students.length, 10, this.search).toPromise();
      this.total = res.count;
      this.students = this.students.concat(res.results);
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load students');
    }
  }

  async loadMore(event) {
    await this.loadStudents();
    event.target.complete();
  }

  ngOnDestroy() {
    this.unsubscribeStudent$.next();
    this.unsubscribeStudent$.complete();
  }
}


