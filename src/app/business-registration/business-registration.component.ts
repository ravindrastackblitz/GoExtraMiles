import { Component } from '@angular/core';
import { UserloginService } from '../services/userlogin.service';
import { toastersrc } from '../services/toastr.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-business-registration',
  templateUrl: './business-registration.component.html',
  styleUrls: ['./business-registration.component.css']
})
export class BusinessRegistrationComponent {

  constructor ( private userloginService:UserloginService,private _router: Router,){ }
    Email = localStorage.getItem('Email');
    phone = localStorage.getItem('phoneNumber')
ngOnInit(){
  if(this.phone != '' && this.phone != undefined)
    {
      if(this.Email != '' && this.Email != undefined){
        this.userloginService.setIsMainHeaderVisible(true); 
      }
    }
    else{
      this._router.navigate(['']);
    }

}
nexttab(){
  console.log("hello this nexttab button");
 this._router.navigate(['/CreateBusinessAccount']);
console.log('after link');
}
}
