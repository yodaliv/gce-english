import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Question, QuestionAssignment, SubQuestion } from '../models/question';
import { Pagination } from '../models/pagination';
import { StudentReport } from '../models/student';



@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http: HttpClient
  ) {
  }

  searchQuestions(categories: string[], level: string, limit: number, random = true): Observable<Pagination<Question>> {
    const url = `${environment.api}/questions/`;
    let params = new HttpParams();
    categories.forEach(category => {
      params = params.append('categories__name', category);
    });
    if (level) {
      params = params.append('level_score', level);
    }
    if (random) {
      params = params.append('random', 'true');
    }
    params = params.append('limit', String(limit));
    return this.http.get<Pagination<Question>>(url, { params });
  }

  createQuestion(payload: Question): Observable<Question> {
    return this.http.post<Question>(`${environment.api}/questions/`, payload).pipe(
    );
  }

  createSubQuestion(parentId: string, payload: SubQuestion): Observable<SubQuestion> {
    const url = `${environment.api}/questions/${parentId}/sub-questions/`;
    return this.http.post<SubQuestion>(url, payload);
  }

  updateQuestion(id: string, payload: Question): Observable<Question> {
    const url = `${environment.api}/questions/${id}/`;
    return this.http.put<Question>(url, payload);
  }

  updateSubQuestion(parentId: string, subId: string, payload: SubQuestion): Observable<SubQuestion> {
    const url = `${environment.api}/questions/${parentId}/sub-questions/${subId}/`;
    return this.http.put<SubQuestion>(url, payload);
  }

  saveQuestionToExam(examId: string, questionId: string): Observable<QuestionAssignment> {
    const url = `${environment.api}/exams/${examId}/questions/`;
    return this.http.post<QuestionAssignment>(url, {question: questionId});
  }

  saveQuestionsToExam(examId: string, questionIds: string[]): Observable<QuestionAssignment[]> {
    const url = `${environment.api}/exams/${examId}/questions/`;
    return this.http.post<QuestionAssignment[]>(url, questionIds.map(x => ({question: x})));
  }

  deleteQuestionFromExam(examId: string, questionId: string): Observable<any> {
    const url = `${environment.api}/exams/${examId}/questions/${questionId}`;
    return this.http.delete(url);
  }

  checkInvisibleAnswer(examId: string, assignmentId: string, questionId: string, subQuestionId: string, answer: string) {
    const url = `${environment.api}/exams/${examId}/assignments/${assignmentId}/answers/`;
    const payload = {
      exam_question: questionId,
      question: subQuestionId,
      answer
    };
    return this.http.post(url, payload);
  }

  getReport(examId: string, assignmentId: string): Observable<StudentReport> {
    const url = `${environment.api}/exams/${examId}/assignments/${assignmentId}/report/`;
    return this.http.get<StudentReport>(url);
  }
}
