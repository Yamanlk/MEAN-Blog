import { Injectable, ErrorHandler, ApplicationRef } from '@angular/core';

@Injectable()
export class ErrorHandlerService implements ErrorHandler {
  constructor() { }

  handleError(error) {
    console.log(error);
  }
}
