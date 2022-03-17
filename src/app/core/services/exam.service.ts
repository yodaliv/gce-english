import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exam } from '../models/exam';
import { Pagination } from '../models/pagination';
import { QuestionAssignment } from '../models/question';
import { paginatorParam } from '../utils/api.util';



@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(
    private http: HttpClient
  ) { }

  getExams(offset = 0, limit = 10): Observable<Pagination<Exam>> {
    const url = `${environment.api}/exams/`;
    return this.http.get<Pagination<Exam>>(url, {params: paginatorParam(offset, limit)});
  }

  getQuestionsByExamId(id, offset = 0, limit = 10): Observable<Pagination<QuestionAssignment>> {
    const url = `${environment.api}/exams/${id}/questions/`;
    return this.http.get<Pagination<QuestionAssignment>>(url, {params: paginatorParam(offset, limit)});
  }

  getAssignmentQuestionsByExamId(examId, assignmentId, offset = 0, limit = 10): Observable<QuestionAssignment[]> {
    const url = `${environment.api}/exams/${examId}/assignments/${assignmentId}/questions/`;
    return this.http.get<QuestionAssignment[]>(url, {params: paginatorParam(offset, limit)});
  }

  getExamById(id: string): Observable<Exam> {
    const url = `${environment.api}/exams/${id}/`;
    return this.http.get<Exam>(url);
  }

  createExam(payload: Exam): Observable<Exam> {
    const url = `${environment.api}/exams/`;
    return this.http.post<Exam>(url, this.toFormData(payload));
  }

  updateExam(id, payload: Exam): Observable<Exam> {
    const url = `${environment.api}/exams/${id}/`;
    return this.http.post<Exam>(url, this.toFormData(payload));
  }

  autoAssignExam(id: string) {
    const url = `${environment.api}/exams/${id}/assign/`;
    return this.http.post<any>(url, {});
  }

  toFormData<T>( formValue: T ) {
    const formData = new FormData();
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      if (value !== null) {
        formData.append(key, value);
      }
    }
    return formData;
  }
}
