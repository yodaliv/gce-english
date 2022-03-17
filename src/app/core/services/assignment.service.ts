import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Assignment } from '../models/assignment';
import { Pagination } from '../models/pagination';
import { paginatorParam } from '../utils/api.util';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(
    private http: HttpClient
  ) { }

  getAssignments(offset = 0, limit = 10): Observable<Pagination<Assignment>> {
    const url = `${environment.api}/assignments/`;
    let params = paginatorParam(offset, limit);
    params = params.append('is_completed', String('false'));
    return this.http.get<Pagination<Assignment>>(url, { params });
  }

  getPracticeAssignments(completed: boolean = false, offset = 0, limit = 10): Observable<Pagination<Assignment>> {
    const url = `${environment.api}/assignments/`;
    let params = paginatorParam(offset, limit);
    params = params.append('is_completed', String(completed.toString()));
    params = params.append('is_practice', String('true'));
    return this.http.get<Pagination<Assignment>>(url, { params });
  }

  getTestAssignments(completed: boolean = false, offset = 0, limit = 10): Observable<Pagination<Assignment>> {
    const url = `${environment.api}/assignments/`;
    let params = paginatorParam(offset, limit);
    params = params.append('is_completed', String('false'));
    params = params.append('is_practice', String('false'));
    return this.http.get<Pagination<Assignment>>(url, { params });
  }

  getAllAssignments(offset = 0, limit = 10): Observable<Pagination<Assignment>> {
    const url = `${environment.api}/assignments/`;
    return this.http.get<Pagination<Assignment>>(url, {params: paginatorParam(offset, limit)});
  }

  markCompleted(id: string) {
    const url = `${environment.api}/assignments/${id}/mark_completed/`;
    return this.http.patch<Assignment>(url, {});
  }
}
