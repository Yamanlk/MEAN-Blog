import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { map, catchError, retryWhen, take } from "rxjs/operators"
import { NotificationService } from './notification.service';
import { ERRORS } from 'shared'
import { Router } from '@angular/router';


@Injectable()
export class HttpErrorHandlerService implements HttpInterceptor {

  constructor(private notificationService: NotificationService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tries = 3;
    let delay = 1000;

    return next.handle(req).pipe(
      map(evnt => {
        if (navigator.onLine === false) { throw new Error("No internet connection"); }
        else { return evnt; }
      }),
      retryWhen((errors) => {
        return errors.pipe(
          map(error => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === ERRORS.BadRequest.status || error.status === 0) {
                return;
              } else if (tries === 0) {
                throw error;
              } else {
                return;
              };
            } else return;
          })
        )
      }),
      catchError((error, caught) => {
        if (error instanceof Error) {
          this.notificationService.addNotification(error.message);
          return EMPTY;
        }
        else if (error instanceof HttpErrorResponse) { return this.handleError(error); }
      })
    )
  }

  private handleError(httpError: HttpErrorResponse): Observable<any> {
    let observable: Observable<any> = EMPTY;

    switch (httpError.status) {
      case ERRORS.BadRequest.status:
        this.notificationService.addNotification(ERRORS.BadRequest.message);
        break;
      case ERRORS.Unauthorized.status:
        this.notificationService.addNotification(ERRORS.Unauthorized.message);
        this.router.navigateByUrl("auth/signin");
        break;
      case ERRORS.Forbidden.status:
        this.notificationService.addNotification(ERRORS.Unauthorized.message);
        window.history.back();
        break;
      case ERRORS.NotFound.status:
        this.notificationService.addNotification(ERRORS.NotFound.message);
        break;
      default:
        this.notificationService.addNotification("Unexpected error: " + httpError.status);
        break;
    }

    return observable;
  }

  private handleInvalidData(info: any): Observable<any> {
    if (info.hasOwnProperty("cookie")) {
      this.router.navigateByUrl("auth/signin");
      this.notificationService.addNotification('Please signin again')
      return EMPTY;
    }
    else if (info.hasOwnProperty("objectId")) {
      this.notificationService.addNotification(info.objectId);
      return EMPTY
    }
    else {
      return of(new HttpResponse({
        status: 0,
        body: info,
      }));
    }
  }
}