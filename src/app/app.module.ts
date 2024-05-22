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
import { GSTDetailsComponent } from './gstdetails/gstdetails.component';
import { StoreTimingsComponent } from './store-timings/store-timings.component';
import { BusinessRegistrationDetailsComponent } from './business-registration-details/business-registration-details.component';
import { UrbenRiderStoreCatalougeComponent } from './urben-rider-store-catalouge/urben-rider-store-catalouge.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { MyCatalougeComponent } from './my-catalouge/my-catalouge.component';
import { ScratchCardInsightsComponent } from './scratch-card-insights/scratch-card-insights.component';
import { PromotionInsightsComponent } from './promotion-insights/promotion-insights.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { ScratchCardComponent } from './scratch-card/scratch-card.component';
import { PopupComponent } from './popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgOtpInputModule } from  'ng-otp-input';
import { PhonenumberDirective } from './phonenumber.directive';

import { MatIconModule } from '@angular/material/icon';
import { IntlInputPhoneModule } from 'intl-input-phone';
import { MapsAPILoader } from '@agm/core';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AgmCoreModule } from '@agm/core';


const approu :Routes=[
  {path:'extramail',component:ExtraMailBusinessComponent},
  {path:'',component:ExtraMailBusinessComponent},

  {path:'phone',component:PhoneComponent},
  {path:'OTP',component:OTPVerificationsComponent},
  {path:'BusinessRegistration' ,component:BusinessRegistrationComponent},
  {path:'CreateBusinessAccount',component:CreateBusinessAccountComponent},
  {path:'selectBusinessCategory',component:SelectBusinessCategoryComponent},
  {path:'GSTDetails',component:GSTDetailsComponent},
  {path:'GoogleMap',component:GoogleMapComponent},
  {path:'StoreTimings',component:StoreTimingsComponent},
  {path:'BusinessRegistrationDetails',component:BusinessRegistrationDetailsComponent},
  {path:'UrbanRiderStoreCatalouge',component:UrbenRiderStoreCatalougeComponent},
  {path:'AddItem',component:AddItemComponent},
  {path:'ItemDetails',component:ItemDetailsComponent},
  {path:'MyCatalouge',component:MyCatalougeComponent},
  {path:'ScratchCardInsights',component:ScratchCardInsightsComponent},
  {path:'PromotionInsights',component:PromotionInsightsComponent},
  {path:'Scratchcard',component:ScratchCardComponent},
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
    GSTDetailsComponent,
    StoreTimingsComponent,
    BusinessRegistrationDetailsComponent,
    UrbenRiderStoreCatalougeComponent,
    AddItemComponent,
    ItemDetailsComponent,
    MyCatalougeComponent,
    ScratchCardInsightsComponent,
    PromotionInsightsComponent,
    ScratchCardComponent,
    PopupComponent,
    PhonenumberDirective,
    TermsComponent,
    HeaderComponent,
    SpinnerComponent,
    GoogleMapComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,MatDialogModule,
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
    IntlInputPhoneModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyCw1WGnlRsc19GSCRBdgxKqgrjvVPSUwzk',
      libraries: ['places'],
    })
    // AgmCoreModule.forRoot({
    //   // please get your own API key here:
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
    //   apiKey: 'AIzaSyD6zd5tZXhsFOEdfQ2XxIyiiYxMzScu2Fw',
    //   libraries: ["places"]
    // }),
   
  ],
  providers: [Geolocation,
    { provide: 'AIzaSyCw1WGnlRsc19GSCRBdgxKqgrjvVPSUwzk', useValue: 'AIzaSyCw1WGnlRsc19GSCRBdgxKqgrjvVPSUwzk' }
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
