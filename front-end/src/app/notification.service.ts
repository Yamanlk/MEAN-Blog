import { Injectable, Component, ApplicationRef } from '@angular/core';
import { MatSnackBar } from "@angular/material"

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: string[] = [];
  constructor(private matSnackBar: MatSnackBar, private applicationRef: ApplicationRef) { }
  private notify() {
    const snackBarRef = this.matSnackBar.open(this.notifications[0], "X", { duration: 3000})
    snackBarRef.afterDismissed().subscribe(() => {
      this.removeNotification();
    });
  }

  public addNotification(notification: string) {
    this.notifications.unshift(notification);
    if (this.notifications.length === 1) this.notify();
  }

  private removeNotification() {
    this.notifications.pop();
    if (this.notifications.length !== 0) this.notify();
  }
}
