import { Component, HostListener, OnInit } from '@angular/core';
import { UserloginService } from '../services/userlogin.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notifications.service';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notificationCount = 0;
  notifications: string[] = [];
  popupVisible = false;
  badgeCount: number;
  MainHeaderVisible:boolean=false;
  username:string="";
  user!:any;
  subscription: Subscription;
  notificationspopup!:boolean;
  constructor(private userloginService: UserloginService,private notificationService: NotificationService,private popupservices:PopupService)
   {
    this.badgeCount = 5;
    this.subscription = this.userloginService.getIsMainHeaderVisible$.subscribe(role => this.MainHeaderVisible = role);
    this.subscription = this.userloginService.getusername$.subscribe(name => this.username = name);
    this.user = localStorage.getItem('Email')
  }
  Logout(){
    localStorage.removeItem('Email');
    localStorage.removeItem('phoneNumber');
  }
  incrementCount() {
    this.badgeCount++;
  }
 
  ngOnInit() {
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
      this.notificationCount = notifications.length;
    });
  }

  clearCount() {
    this.badgeCount = 0;
  }

  notificationclose(){
    this.notificationspopup = false;
  }
  toggleNotificationPopup() {
   this.notificationspopup = true;
    this.notificationCount = 0;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notification-container')) {
      this.popupVisible = false;
    }
  }
}
