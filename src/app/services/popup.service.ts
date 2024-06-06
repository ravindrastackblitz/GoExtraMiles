import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private notificationsSubject = new BehaviorSubject<string[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private notificationspopup : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public get   getnotificationspopup1$():Observable<boolean>{return  this.notificationspopup.asObservable();}
  private notifications: string[] = [];

  addNotification() {
    this.notifications.push(`Notification ${this.notifications.length + 1}`);
    this.notificationsSubject.next(this.notifications);
  }

  setnotificationspopup(notification:boolean){
this.notificationspopup.next(notification)
  }
}
