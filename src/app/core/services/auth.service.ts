import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { DecodedToken, LoginRequest, LoginResponse, RegisterRequest, User } from '../models/auth';
import { anonParam } from '../utils/api.util';
import { parseToPayload } from '../utils/dto.util';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;
  tokenChanged$: Subject<boolean> = new Subject<boolean>();

  user: User;
  userChanged$: BehaviorSubject<User> = new BehaviorSubject<User>(this.user);

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
  }

  getToken(): Promise<string> {
    return this.storage.get(environment.storage.accessToken);
  }

  async decodeToken(): Promise<DecodedToken> {
    try {
      const token = await this.getToken();
      return jwt_decode(token);
    } catch (e) {
      return null;
    }
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.getToken().then(token => {
        if (token) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(err => {
        resolve(false);
      });
    });
  }

  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const res: LoginResponse = await this.http.post<LoginResponse>(
        `${environment.api}/auth/login/`,
        payload,
        {params: anonParam()
      }).toPromise();
      // save user profile information
      this.user = res.user;
      this.userChanged$.next(this.user);
      await this.initializeLogin(res);
      return res;
    } catch (e) {
      throw e;
    }
  }

  async logout() {
    await this.storage.clear();
    this.tokenChanged$.next(true);
    await this.router.navigate(['/login'], {replaceUrl: true});
  }

  getProfile(): Observable<User | null> {
    return this.http.get<User>(`${environment.api}/users/me/`).pipe(
      tap(res => {
        this.user = res;
        this.userChanged$.next(this.user);
      }),
      catchError( err => {
        if (err.status === 401) {
          this.storage.clear();
          this.user = null;
          this.userChanged$.next(null);
        }
        return throwError(null);
      })
    );
  }

  async register(payload: RegisterRequest): Promise<LoginResponse>  {
    const url = `${environment.api}/auth/register/`;
    try {
      const res: LoginResponse = await this.http.post<LoginResponse>(url, parseToPayload(payload), {params: anonParam()}).toPromise();
      // save user profile information
      this.user = res.user;
      this.userChanged$.next(this.user);
      await this.initializeLogin(res);
      return res;
    } catch (err) {
      throw err;
    }
  }
  async initializeLogin(res) {
    // save token to the storage
    this.token = res.access_token;
    await this.storage.set(environment.storage.accessToken, res.access_token);
    await this.storage.set(environment.storage.refreshToken, res.refresh_token);
    this.tokenChanged$.next(true);
  }

}
