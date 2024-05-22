import { Component } from '@angular/core';
import { UserloginService } from '../services/userlogin.service';
import { toastersrc } from '../services/toastr.service';

@Component({
  selector: 'app-business-registration',
  templateUrl: './business-registration.component.html',
  styleUrls: ['./business-registration.component.css']
})
export class BusinessRegistrationComponent {

  constructor ( private userloginService:UserloginService){ }
    Email = localStorage.getItem('Email')
ngOnInit(){
  if(this.Email != '' && this.Email != undefined){
    this.userloginService.setIsMainHeaderVisible(true); 
  }
}
}
