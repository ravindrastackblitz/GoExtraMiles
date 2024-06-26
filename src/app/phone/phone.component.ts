import { Component, ViewEncapsulation } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Route, Router } from '@angular/router';
import  intlTelInput from 'intl-tel-input';
 import { ConfigurationOptions, CustomCountryModel, OutputOptionsEnum } from "intl-input-phone";
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserloginService } from '../services/userlogin.service';
//import { environment } from 'src/environments/environment';
import { AppConfigService } from '../services/appsettings.service';

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
clicked!:boolean;
Email = localStorage.getItem('Email')
 
   constructor(private formBuilder: FormBuilder,private route : Router,private userloginService:UserloginService,private appsetting:AppConfigService) 
   {
    
     this.phoneForm = this.formBuilder.group
     ({
       sampleReactiveControl: new FormControl()
     });
     this.configOption1 = new ConfigurationOptions();
     this.configOption1.OutputFormat = OutputOptionsEnum.Number
     this.configOption1.IsShowAllOtherCountry = false;
     this.customCountryList1.push({ISOCode : "IN"});
   }
 
   ngOnInit()
    {
      if(this.Email != '' && this.Email != undefined)
        {
          var config=this.appsetting.firebasedata
          firebase.initializeApp( config)

        }
         else
         {
          this.route.navigate(['']);
        }
    }
   
   GetOtp() 
   {
    this.verify =true;
    this.reCaptchaverifer = new firebase.auth.RecaptchaVerifier('sign-in-button', {size: 'invisible'});
    this.phoneNumber = this.phoneForm.value.sampleReactiveControl.CountryModel.CountryPhoneCode + this.phoneForm.value.sampleReactiveControl.Number;
    localStorage.setItem('phoneNumber', this.phoneNumber); // Log phoneNumber to check its value
   }

  onConfirm() 
  {
    firebase
      .auth()
      .signInWithPhoneNumber(this.phoneNumber, this.reCaptchaverifer)
      .then((confirmationResult) => 
        {
          localStorage.setItem('verificationId', confirmationResult.verificationId);
          this.route.navigate(['/OTP']);
          this.reCaptchaverifer.clear();
        })
        .catch((error) =>
          {
            alert('Error sending OTP: ' + error.message);
            // Log the entire error object for detailed inspection
          });
  }
  
  onEdit()
  {
    this.verify =false;
  }
  
}
 