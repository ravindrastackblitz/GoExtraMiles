import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExtraMailBusinessComponent } from './extra-mail-business/extra-mail-business.component';
import { PhoneComponent } from './phone/phone.component';
import { OTPVerificationsComponent } from './otpverifications/otpverifications.component';
import { BusinessRegistrationComponent } from './business-registration/business-registration.component';
import { CreateBusinessAccountComponent } from './create-business-account/create-business-account.component';
import { SelectBusinessCategoryComponent } from './select-business-category/select-business-category.component';
import { StoreTimingsComponent } from './store-timings/store-timings.component';
import { BusinessRegistrationDetailsComponent } from './business-registration-details/business-registration-details.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { MyCatalougeComponent } from './my-catalouge/my-catalouge.component';
import { ScratchCardInsightsComponent } from './scratch-card-insights/scratch-card-insights.component';
import { PromotionInsightsComponent } from './promotion-insights/promotion-insights.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { PopupComponent } from './popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgOtpInputModule } from  'ng-otp-input';
import { PhonenumberDirective } from './phonenumber.directive';
import { MatIconModule } from '@angular/material/icon';
import { IntlInputPhoneModule } from 'intl-input-phone';
import {  MapsAPILoader } from '@agm/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { environment } from 'src/environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import { TermsComponent } from './terms/terms.component';
import { HeaderComponent } from './header/header.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {MatTabsModule} from '@angular/material/tabs';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';
import { ToastrModule } from 'ngx-toastr';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfigService } from './services/appsettings.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import appSettings from '../assets/appsettings.json';




const approu :Routes=[
  {path:'extramail',component:ExtraMailBusinessComponent},
  {path:'',component:ExtraMailBusinessComponent},
  {path:'phone',component:PhoneComponent},
  {path:'OTP',component:OTPVerificationsComponent},
  {path:'BusinessRegistration' ,component:BusinessRegistrationComponent},
  {path:'CreateBusinessAccount',component:CreateBusinessAccountComponent},
  {path:'selectBusinessCategory',component:SelectBusinessCategoryComponent},
  {path:'GoogleMap',component:GoogleMapComponent},
  {path:'StoreTimings',component:StoreTimingsComponent},
  {path:'BusinessRegistrationDetails',component:BusinessRegistrationDetailsComponent},
  {path:'AddItem',component:AddItemComponent},
  {path:'ItemDetails',component:ItemDetailsComponent},
  {path:'MyCatalouge',component:MyCatalougeComponent},
  {path:'ScratchCardInsights',component:ScratchCardInsightsComponent},
  {path:'PromotionInsights',component:PromotionInsightsComponent},
  {path:'terms',component:TermsComponent}
]



@NgModule({
  declarations: [
    AppComponent,
    ExtraMailBusinessComponent,
    PhoneComponent,
    OTPVerificationsComponent,
    BusinessRegistrationComponent,
    CreateBusinessAccountComponent,
    SelectBusinessCategoryComponent,
    StoreTimingsComponent,
    BusinessRegistrationDetailsComponent,
    AddItemComponent,
    ItemDetailsComponent,
    MyCatalougeComponent,
    ScratchCardInsightsComponent,
    PromotionInsightsComponent,
    PopupComponent,
    PhonenumberDirective,
    TermsComponent,
    HeaderComponent,
    SpinnerComponent,
    GoogleMapComponent, 
  ],
  imports: [  
    MatSelectModule, 
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgOtpInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatFormFieldModule,
    MatTabsModule,
    HttpClientModule,
    NgxOtpInputModule,
    MatProgressSpinnerModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(approu),
    NgxOtpInputModule,  
    ToastrModule.forRoot({progressBar: true}),
    IntlInputPhoneModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatIconModule,
    BrowserModule, 
    FormsModule, 
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey:appSettings.MapApiKey.apikey,
      libraries:appSettings.MapApiKey.libraries
    })
  ],

  providers:  [
    Geolocation,{provide:appSettings.MapApiKey.apikey,useValue:appSettings.MapApiKey.apikey},
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          // Make sure to return a promise!
          return appConfigService.loadAppConfig();
        };
      } 
    },
  ], 
  exports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  bootstrap: [AppComponent]
})


export class AppModule {
}

declare global {
  interface Window {
    google: typeof google;
  }
}


