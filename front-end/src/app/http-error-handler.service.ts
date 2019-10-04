import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, of, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators"
import { NotificationService } from './notification.service';
import { NoInternetConnectionError, BaseError, ErrorStatus } from 'shared'
import { Router } from '@angular/router';


@Injectable()
export class HttpErrorHandlerService implements HttpInterceptor {

  constructor(private notificationService: NotificationService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req).pipe(
      map(evnt => {
        if (navigator.onLine === false) throw new HttpErrorResponse({ error: new NoInternetConnectionError, status: ErrorStatus.NoInternetConnection });
        else return evnt;
      }),
      catchError((httpResponseError, caught) => {
        console.log(httpResponseError);
        return this.handleError(httpResponseError);
      })
    )
  }

  private handleError(httpError: HttpErrorResponse): Observable<any> {
    if (httpError.status === 422 && httpError.error.hasOwnProperty("extraInfo")) return this.handleInvalidData(httpError.error.extraInfo);
    else if(httpError.status === 0) {
      this.notificationService.addNotification("Unexpected error occurred")
      return of(new HttpResponse({status: 0}))
    }
    else {
      this.notificationService.addNotification(httpError.error.message);
      window.history.back();
      return EMPTY;
    }
  }

  private handleInvalidData(infos: any): Observable<any> {
    if (infos.hasOwnProperty("cookie")) {
      this.router.navigateByUrl("auth/signin");
      this.notificationService.addNotification('Please signin again')
      return EMPTY;
    }
    else if(infos.hasOwnProperty("objectId")) {
      this.notificationService.addNotification(infos.objectId);
      return EMPTY
    }
    else {
      return of(new HttpResponse({
        status: ErrorStatus.InvalidData,
        body: infos,
      }));
    }
  }
}