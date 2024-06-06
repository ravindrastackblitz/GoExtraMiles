import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
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
