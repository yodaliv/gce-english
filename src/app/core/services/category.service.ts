import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Category, SubCategory } from '../models/category';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Pagination<Category>> {
    return this.http.get<Pagination<Category>>(`${environment.api}/categories/`);
  }

  getParentCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.api}/categories/parent/`);
  }

  getSubCategories(parent: string): Observable<SubCategory[]> {
    const url = `${environment.api}/categories/sub-categories/`;
    let params = new HttpParams();
    params = params.append('category_name', parent);
    return this.http.get<SubCategory[]>(url, { params });
  }

}
