import { Component,OnInit } from '@angular/core';
import   intlTelInput from 'intl-tel-input'; // Import the library
import { NgxOtpInputConfig } from 'ngx-otp-input';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Route, Router } from '@angular/router';
import {  OnDestroy } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { take } from 'rxjs/operators'
import { UserloginService } from '../services/userlogin.service';
import { NotificationService } from '../services/notifications.service';
import { toastersrc } from '../services/toastr.service';

@Component({
  selector: 'app-otpverifications',
  templateUrl: './otpverifications.component.html',
  styleUrls: ['./otpverifications.component.css']
})

export class OTPVerificationsComponent {
otp!:string;
verify:any;
spinner!:boolean;
Email = localStorage.getItem('Email');

constructor(private route : Router,private userloginService: UserloginService,private notificationService: NotificationService,private toastar:toastersrc){}

config =
{
  allowNumberOnly:true,
    length:6,
    isPasswordInput:false,
    disableAutoFocus:false,
    placeholder:'',
    inputStyle:{
      width:'50px',
      height:'50px'
    },
}

  ngOnInit()
  {
    if(this.Email != '' && this.Email != undefined){
      this.verify=JSON.parse(JSON.stringify(localStorage.getItem('verificationId')) || '{}');
    }
    else
    {
      this.route.navigate(['']); 
    }   
  }

  onOtpChange(otpcode:any)
  {
     this.otp = otpcode;
  }

handleClick()
{
  var credentials = firebase.auth.PhoneAuthProvider.credential(this.verify,this.otp);
  firebase
  .auth()
  .signInWithCredential(credentials)
  .then((response)=>{
    localStorage.setItem('user_data',JSON.stringify(response));
    this.notificationService.addNotification();
    this.route.navigate(['/BusinessRegistration']);
    this.toastar.success("Your Mobile Number Verifycation Completed Suessfully", "Success")
    this.userloginService.setIsMainHeaderVisible(true); 
  }).catch((error)=>{
    alert(error.message)
  })
}
}
