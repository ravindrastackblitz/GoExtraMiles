import { Component } from '@angular/core';
import { UserloginService } from '../services/userlogin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  badgeCount: number;
MainHeaderVisible:boolean=false;
username:string="";
subscription: Subscription;
  constructor(private userloginService: UserloginService) {
    this.badgeCount = 5;
    this.subscription = this.userloginService.getIsMainHeaderVisible$.subscribe(role => this.MainHeaderVisible = role);
    this.subscription = this.userloginService.getusername$.subscribe(name => this.username = name);
  }

  incrementCount() {
    this.badgeCount++;
  }

  clearCount() {
    this.badgeCount = 0;
  }
}
