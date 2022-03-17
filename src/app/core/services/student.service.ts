import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Student } from '../models/auth';
import { Pagination } from '../models/pagination';
import { paginatorParam } from '../utils/api.util';
import { AuthService } from './auth.service';
import { StudentAssignment, StudentStats } from '../models/student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  invited$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  invited() {
    this.invited$.next(this.invited$.value + 1);
  }

  getStudents(offset = 0, limit = 10, search = ''): Observable<Pagination<Student>> {
    const url = `${environment.api}/students/`;
    let params = paginatorParam(offset, limit);
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<Pagination<Student>>(url, {params});
  }

  getAssignedStudentsByExamId(examId: string, offset = 0, limit = 10): Observable<Pagination<StudentAssignment>> {
    const url = `${environment.api}/exams/${examId}/assignments/`;
    return this.http.get<Pagination<StudentAssignment>>(url, {params: paginatorParam(offset, limit)});
  }

  saveAssignments(examId: string | number, assigns: {student: number | string}[]): Observable<any> {
    const url = `${environment.api}/exams/${examId}/assignments/`;
    return this.http.post(url, assigns);
  }

  deleteAssignment(examId: string | number, ids: Array<string | number>): Observable<any> {
    const url = `${environment.api}/exams/${examId}/assignments/`;
    let params = new HttpParams();
    ids.forEach(id => {
      params = params.append('id', String(id));
    });
    return this.http.delete(url, {params});
  }

  inviteStudentByEmail(email: string) {
    const name = email.substring(0, email.lastIndexOf('@'));
    const url = `${environment.api}/students/assign/`;
    return this.http.post(url, {name, email});
  }

  deassignStudent(email: string): Observable<any> {
    const url = `${environment.api}/students/deassign/`;
    return this.http.request('delete', url, { body: { email: encodeURI(email) } });
  }

  getAssignmentIdByExam(examId: string): Observable<string> {
    const url = `${environment.api}/exams/${examId}/assignments/`;
    return this.http.get<Pagination<StudentAssignment>>(url, {params: paginatorParam(0, 100)}).pipe(
      map(res => {
        const found = res.results.find(x => x.student_details.id === this.authService.user.id);
        return found ? found.id : null;
      })
    );
  }
  getStudentStats(): Observable<StudentStats> {
    const url = `${environment.api}/users/stats/`;
    return this.http.get<StudentStats>(url);
  }
}
