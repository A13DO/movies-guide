import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Check if the request is made using fetch
    if (request.method === 'GET') {
      this.loadingService.requestStarted();
    }
    return next.handle(request)
    .pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            if (request.method === 'GET') {
              this.loadingService.requestEnded(); // Hide the loading screen
            }
          }
      },
      (error: HttpErrorResponse) => {
        if (request.method === 'GET') {
          this.loadingService.resetSpinner()
        }
        throw error;
      })
    );;
  }
}

