import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Sentry from '@sentry/browser';
import { HttpErrorResponse } from '@angular/common/http';

const env = environment.production ? 'production' : 'development';
Sentry.init({
  dsn: environment.sentryDSN,
  environment: env
});

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements ErrorHandler {
  constructor() {}
  handleError(error) {
    Sentry.captureException(error.originalError || error);
  }
}
