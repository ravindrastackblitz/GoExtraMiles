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
import { NotificationService } from '../notifications.service';
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

constructor(private route : Router,private userloginService: UserloginService,
  private notificationService: NotificationService,private toastar:toastersrc){}

  config ={
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
  // countDown: Subscription | undefined | any;
  // counter = 29;
  // tick = 1000;


  ngOnInit()
  {
    // this.countDown = timer(0, this.tick)
    // .pipe(take(this.counter))
    // .subscribe(() => {
    //   --this.counter;
    //   // console.log(this.counter);
    //   if (this.counter == 0) {
    //     this.countDown.unsubscribe();
    //   }
    // });

    this.verify=JSON.parse(JSON.stringify(localStorage.getItem('verificationId')) || '{}');
    console.log(this.verify)     
  }
  // transform(value: number): string {
    
  //   const minutes: number = Math.floor(value / 60);
  //   return (
  //     ('00' + minutes).slice(-2) +
  //     ':' +
  //     ('00' + Math.floor(value - minutes * 60)).slice(-2)
  //   );
  // }

  onOtpChange(otpcode:any){
     this.otp = otpcode;
     console.log(this.otp)
  }
handleClick(){
  var credentials = firebase.auth.PhoneAuthProvider.credential(this.verify,this.otp);

  firebase
  .auth()
  .signInWithCredential(credentials)
  .then((response)=>{
    console.log("THirhfh",response);
    localStorage.setItem('user_data',JSON.stringify(response));
    this.notificationService.addNotification();
    this.route.navigate(['/BusinessRegistration']);
this.toastar.success("Your Mobile Number Verifycation Completed Suessfully", "Success")
    //show main header 
    this.userloginService.setIsMainHeaderVisible(true); 

  }).catch((error)=>{
    alert(error.message)
  })
}



  // ngOnInit() {
  //   const inputElement = document.querySelector('#phone') as HTMLInputElement; // Explicitly cast to HTMLInputElement
  //   if (inputElement) {
  //     intlTelInput(inputElement, {
  //       initialCountry: 'in', // Corrected typo
  //     // separateDialCode: true, // Corrected typo
  //       utilsScript: 'httpx://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
  //     });
  //   }
  // }

}
