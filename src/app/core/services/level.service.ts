import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(
    private http: HttpClient
  ) { }

  getLevels(): Observable<string[]> {
    const url = `${environment.api}/questions/levels/`;
    return this.http.get<string[]>(url);
  }
}
