import { Component, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupService } from '../services/popup.service';
import { NotificationService } from '../services/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  notificationCount = 0;
  notifications: string[] = [];
  popupVisible = false;
  subscription!:Subscription
  notificationspopup!:boolean

  constructor(private notificationService: NotificationService) {
    this.subscription = this.notificationService.getnotificationspopup1$.subscribe(val =>this.notificationspopup = val )
  }

  ngOnInit() {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
      this.notificationCount = notifications.length;
    });
  }

  notificationclose(){
    this.notificationspopup = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-container')) {
      this.popupVisible = false;
    }
  }
}
