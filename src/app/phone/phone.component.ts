import { Component, ViewEncapsulation } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Route, Router } from '@angular/router';
import  intlTelInput from 'intl-tel-input';
 import { ConfigurationOptions, CustomCountryModel, OutputOptionsEnum } from "intl-input-phone";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
var config = {
  apiKey: "AIzaSyASnQe-_0mreed5EBiYq8GRbXe5bh5Zruo",
  authDomain: "phone-auth-7ef07.firebaseapp.com",
  projectId: "phone-auth-7ef07",
  storageBucket: "phone-auth-7ef07.appspot.com",
  messagingSenderId: "607514732171",
  appId: "1:607514732171:web:7ab5c53205a38d1e21168e"
  

}
@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class PhoneComponent {
  verify!:boolean;
  configOption1: ConfigurationOptions;
  phoneForm: FormGroup;
  customCountryList1 : CustomCountryModel[] = [];
  phoneNumber:any;
  reCaptchaverifer: any;
  dialog: any;
 spinner!:boolean;


 
   constructor(private formBuilder: FormBuilder,private route : Router) {
     this.phoneForm = this.formBuilder.group({
       sampleReactiveControl: new FormControl()
     });
     this.configOption1 = new ConfigurationOptions();
     this.configOption1.OutputFormat = OutputOptionsEnum.Number
   
     this.configOption1.IsShowAllOtherCountry = false;
     this.customCountryList1.push({ISOCode : "IN"});
     
   }
 
   ngOnInit() {
    firebase.initializeApp( config)
   }
   
   GetOtp() {
    this.verify =true;
    this.reCaptchaverifer = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        size: 'invisible'
    });
    

    this.phoneNumber = this.phoneForm.value.sampleReactiveControl.CountryModel.CountryPhoneCode + this.phoneForm.value.sampleReactiveControl.Number;
   localStorage.setItem('phoneNumber', this.phoneNumber); // Log phoneNumber to check its value

  }

  onConfirm() {

    // setTimeout(() => {
    //   this.spinner=true;
    // }, 2000);
    firebase
      .auth()
      .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaverifer)
      .then((confirmationResult) => {
        localStorage.setItem('verificationId', confirmationResult.verificationId);
        this.route.navigate(['/OTP']);
        // setTimeout(() => {
        //   this.spinner=false;
        // }, 2000);
  
        // Close the reCAPTCHA widget
        this.reCaptchaverifer.clear();
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
        alert('Error sending OTP: ' + error.message);
  
        // Log the entire error object for detailed inspection
        console.log('Full error object:', error);
      });
  }
  
  onEdit(){
    this.verify =false;
  }

}
