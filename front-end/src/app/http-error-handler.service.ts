import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { map, catchError, retryWhen, take } from "rxjs/operators"
import { NotificationService } from './notification.service';
import { ERRORS } from 'shared'
import { Router } from '@angular/router';
import { UserAuthenticationService } from './user-authentication.service';


@Injectable()
export class HttpErrorHandlerService implements HttpInterceptor {

  constructor(private notificationService: NotificationService, private router: Router, private authenticationService: UserAuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(evnt => {
        if (navigator.onLine === false) { throw new Error("No internet connection"); }
        else { return evnt; }
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
    let observable: Observable<any>;
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
      case ERRORS.InvalidData.status:
        observable = this.handleInvalidData(httpError.error.info)
        break;
      default:
        this.notificationService.addNotification("Unexpected error: ");
        break;
    }
    if(observable)
    return observable;
    else throw Observable.throw(new Error());
  }

  private handleInvalidData(info: any): Observable<any> {
    if (info.hasOwnProperty("cookie")) {
      this.authenticationService.logout();
      throw Observable.throw(new Error());
    }
    else if (info.hasOwnProperty("objectId")) {
      this.notificationService.addNotification(info.objectId);
      throw Observable.throw(new Error());
    }
    else {
      return of(new HttpResponse({
        status: ERRORS.InvalidData.status,
        body: info,
      }));
    }
  }
}