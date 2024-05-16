// import { Component, Input, OnInit ,AfterViewInit, ChangeDetectorRef, Renderer2,} from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { PopupService } from '../popup.service';
// import {Router} from "@angular/router"
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { GstService } from '../gst.service';

// import {MouseEvent} from '@agm/core'


// import { ImagesarviceService } from '../imagesarvice.service';
// import { ImageUploadService } from '../image-upload.service';
// import { FileUpload } from '../Model/file-upload';


// @Component({
//   selector: 'app-create-business-account',
//   templateUrl: './create-business-account.component.html',
//   styleUrls: ['./create-business-account.component.css']
// })

// export class CreateBusinessAccountComponent implements OnInit {

  

//   selectedFiles?: FileList;
//   currentFileUpload?: FileUpload;
//   percentage = 0;  // imagedata :string | null = null;
//   IsEdit!:boolean;
//    showGstPopup: boolean = false;
//    GSTNumber!: string;
//   // sendnumber!: string;
//   sendnumber:string="";

//   selectbusiness!:boolean;

//   showtimes!:boolean

//   location!: string;
//   mapUrl!: string;

// mapLat: number = 17.547264; // Set the latitude of your business location
// mapLng: number = 78.430208; // Set the longitude of your business location
// mapZoom: number = 10; // Set the initial zoom level of the map
// selectedLat: number | undefined;
// selectedLng: number | undefined;

// searchLocation() {
  
// }

// onMapClick(event: MouseEvent) {
//   this.selectedLat = event.coords.lat;
//   this.selectedLng = event.coords.lng;
// }

//   public Createbusiness!: FormGroup;

//   newbusiness!: {
//     categoryname: any,
//     Image:any;
//     businessName: any,
//     description: any,
//     email: any,
//     website: any,
//     gstNumber: any,
//     isOwner: any,
//     name: any,
//     mobilenumber: any,
//     storetiming: any,
//   };


//   OnlyNubersAllowed(event:any):boolean
//   {
//   const charCode = (event.which)?event.which:event.keyCode;

//   if(charCode > 31 && (charCode < 48 || charCode >57)){
//     console.log('charcode restricted is '+ charCode);
//     return false;
//   }
//   return true;
// }
// imagedata: any | string | ArrayBuffer | null = null;

//  // category = localStorage.getItem('category');
//   // gstnumber = localStorage.getItem('gstnumber');
//  // storetiming =localStorage.getItem('storetime');
//   formDataString = localStorage.getItem('form-data');
// //  formData = formDataString ? JSON.parse(formDataString) : {};
//   formdata = JSON.parse(JSON.stringify(localStorage.getItem('form-data') )|| '{}');

//   category:string="";
//   storetiming:string="";

//   getchilddata(data:string){
//     if(data == "undefined"){
//       this.category = '';
//       this.selectbusiness = false;
//     }
//     else{
//       this.category = data;
//       this.selectbusiness = false;
//     }
//   }

// GetChilddata(data:string){
//   if(data == "undefined"){
//     this.storetiming = '';
//     this.showtimes = false;
//   }else{
//     this.storetiming = data;
//     this.showtimes = false;
//   }
// }

// file: File | undefined;

// getFile(event: any): void {
//   this.file = event.target.files[0]; 
// }


// clearFile(): void {
//   this.file = undefined;
// }
 
//   constructor(private popupservice: PopupService, private gstservice:GstService,
//      private imageService:ImagesarviceService, private formBuilder: FormBuilder,
//      private _router:Router, private httpClient:HttpClient,private uploadService:ImageUploadService,private renderer: Renderer2) 
//   {

//   }

//   ngOnInit() {
//     this.Createbusiness = this.formBuilder.group({
//       searchQuery: [''],
//   //  businessCategory: new FormControl ('', [Validators.required]),
//    Image: new FormControl ('', [Validators.required]),
//       businessName:  new FormControl ('', [Validators.required]),
//       description:  new FormControl ('', [Validators.required]),
//       email:  new FormControl ('', [Validators.required,Validators.email]),
//       website:  new FormControl ('', [Validators.required]),
//       gstNumber:  new FormControl ('', [Validators.required]),
//      isOwner:  new FormControl ('', [Validators.required]),
//       name:  new FormControl ('', [Validators.required]),
//       mobileNumber:  new FormControl ('', [Validators.required]),
//      termsAndConditions: [false, Validators.requiredTrue]
//     });

//     this.imagedata = this.imageService.getImageData();
//     if(!this.IsEdit){
//       if(this.formdata != null || this.formdata != undefined){
//         this.Createbusiness.patchValue({
//           businessCategory : this.formdata.categoryname,
//           businessName : this.formdata.businessName,
//           description : this.formdata.description,
//           email : this.formdata.email,
//           website : this.formdata.website,
//           gstNumber : this.formdata.gstNumber,
//           isOwner : this.formdata.isOwner,
//           name :this.formdata.name,
//           storetiming   :this.formdata.storetiming,
//           mobileNumber :this.formdata.mobilenumber,
//           imagedata : this.imageService.getImageData()
//         })
//       }
//     }
   
// }

//   popup() {
//     this.popupservice.openPopup();
//    this.selectbusiness = true;
//   }
//   gst()
//   {
//    this.showGstPopup = true;
//   }
//   storetime(){
//     this.showtimes =true;
//   }
//   close(){
//  this.showGstPopup = false;
//   }
//   closeDialog(){
//     this.showGstPopup = false;
//      console.log("gstnumber",this.GSTNumber);
//      this.sendnumber = this.GSTNumber;

//     this.Createbusiness.controls['gstNumber'].setValue(this.GSTNumber);
//   }


//   onFileSelected(event: any): void {
//     this.selectedFiles = event.target.files;
//     const file: File = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         this.imagedata = e.target?.result;
//         this.imageService.setImageData(this.imagedata,)
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onFormSubmit(): void {

//     if (this.Createbusiness.valid && this.selectedFiles) {
//       // Upload the selected file first
//       const file: File | null = this.selectedFiles.item(0);
//       if (file) {
//         const file: File | null = this.selectedFiles.item(0);
//                 this.selectedFiles = undefined;
          
//                 if (file) {
//                   this.currentFileUpload = new FileUpload(file);
//                   this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
//                     percentage => {
//                       this.percentage = Math.round(percentage ? percentage : 0);
//                     },
//                     error => {
//                       console.log(error);
//                     }
//                   );
                
//             // Create an object with all the form data, including the image URL
//             const formData = {
//               categoryname: this.category,
//               Image:this.Createbusiness.value.imageUrl,
//               businessName: this.Createbusiness.value.businessName,
//               description: this.Createbusiness.value.description,
//               email: this.Createbusiness.value.email,
//               storetiming: this.storetiming,
//               website: this.Createbusiness.value.website,
//               gstNumber: this.sendnumber,
//               isOwner: this.Createbusiness.value.isOwner,
//               name: this.Createbusiness.value.name,
//               mobilenumber: this.Createbusiness.value.mobileNumber,

//             };
//             localStorage.setItem('form-data', JSON.stringify((formData)));
//             // Make a POST request to Firebase with the form data including the image URL
//             this.httpClient.post("https://phone-auth-7ef07-default-rtdb.firebaseio.com/BusinessRegistration.json", formData)
//               .subscribe(response => {
//                 console.log("Response from Firebase:", response);
//                 // Handle success response, maybe redirect user or show a success message
//               }, (error: HttpErrorResponse) => {
//                 console.error("Error occurred while posting data to Firebase:", error);
//                 // Handle error, maybe show an error message to the user
//               });
//           }
          
        
//       }
//     } else {
//       console.error("Form is not valid or no file selected.");
//       // Handle form validation errors or no file selected, maybe show relevant error messages to the user
//     }
 
//       this._router.navigate(['/BusinessRegistrationDetails']);

//   }
  

// }


// create-business-account.component.ts
// create-business-account.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { ImageUploadService } from '../services/image-upload.service';
import { FileUpload } from '../Model/file-upload';
import { PopupService } from '../services/popup.service';
import { GstService } from '../services/gst.service';
import { BusinessRegistrationCRUDService } from '../services/business-registration-crud.service';
import { CreateBusinessAccount } from '../Model/create-business-account';
import { MouseEvent } from '@agm/core';
import { map,switchMap,take } from 'rxjs/operators';
import { listChanges } from '@angular/fire/compat/database';
import { UserloginService } from '../services/userlogin.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create-business-account',
  templateUrl: './create-business-account.component.html',
  styleUrls: ['./create-business-account.component.css']
})
export class CreateBusinessAccountComponent implements OnInit {
  selectedFiles?: FileList;
  image1:any;
  currentFileUpload?: FileUpload;
  createBusinessAccount!:CreateBusinessAccount;
  createBusinessAccountList?: CreateBusinessAccount[] 
  percentage = 0;
  IsEdit!: boolean;
  showGstPopup: boolean = false;
  GSTNumber!: string;
  sendnumber: string = "";
  selectbusiness!: boolean;
  showtimes!: boolean;
  location!: string;
  mapUrl!: string;
  mapLat: number = 17.547264;
  mapLng: number = 78.430208;
  mapZoom: number = 10;
  selectedLat: number | undefined;
  selectedLng: number | undefined;
  public Createbusiness!: FormGroup;
  imagedata: any | string | ArrayBuffer | null = null;
  category: string = "";
  storetiming: string = "";
  phone :any = localStorage.getItem('phoneNumber');
  buttons!:boolean;
  datatime :string ="";
  username:string ='';
  subscription: Subscription;
formdata:any

  constructor(
    private popupservice: PopupService,
    private gstservice: GstService,
    private imageService: ImagesarviceService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private httpClient: HttpClient,
    private uploadService: ImageUploadService,
    private businessService: BusinessRegistrationCRUDService,
    private userloginService:UserloginService
  ) {
    this.subscription = this.userloginService.getusername$.subscribe(name => this.username = name);
  }


  OnlyNubersAllowed(event:any):boolean
  {
  const charCode = (event.which)?event.which:event.keyCode;

  if(charCode > 31 && (charCode < 48 || charCode >57)){
    console.log('charcode restricted is '+ charCode);
    return false;
  }
  return true;
}


  getchilddata(data:string){
    if(data == "undefined"){
      this.category = '';
      this.selectbusiness = false;
    }
    else{
      this.category = data;
      this.selectbusiness = false;
      this.Createbusiness.controls['categoryname'].setValue(this.category);
    }
  }

GetChilddata(data:string){
  if(data == "undefined"){
    this.storetiming = '';
    this.showtimes = false;
  }else{
    this.storetiming = data;
    this.showtimes = false;
    this.Createbusiness.controls['storetiming'].setValue(this.storetiming);
  }
}

searchLocation()
{

}
  ngOnInit() {
    this.Createbusiness = this.formBuilder.group({
      searchQuery: [''],
      categoryname:new FormControl('',[Validators.required]),
      Image: new FormControl('', [Validators.required]),
      businessName: new FormControl('', [Validators.required]),
      storetiming:new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      website: new FormControl('', [Validators.required]),
      gstNumber: new FormControl('', [Validators.required]),
      isOwner: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      termsAndConditions: [false, Validators.requiredTrue]
    });

    this.businessService.getBusinessRecordByKey1(this.phone).subscribe(
      business => {
        if(business != undefined){
          this.formdata = business;
              console.log( "data form database",this.formdata);
              this.buttons = true;
              localStorage.setItem('key',this.formdata.key);
           //  console.log("this is the key"+this.formdata.url);

           this.Createbusiness?.controls['categoryname'].setValue(this.formdata.categoryname);
             this.datatime  = this.formdata.storetiming;
              this.AddvaluesToform()
        }
        else{
              const some = JSON.parse(JSON.stringify(localStorage.getItem('form-data') )|| '{}');
              this.formdata = JSON.parse(some)
             // console.log(this.formdata);
             this.Createbusiness?.controls['categoryname'].setValue(this.formdata.categoryname);
             this.datatime  = this.formdata?.storetiming
              this.buttons = false;
              localStorage.removeItem('key');
              this.AddvaluesToform()
            } 
      });
    

     
    // this.imagedata = this.imageService.getImageData(); 
    // this.businessService.getBusinessByPhoneNumber(this.phone).subscribe(data => {
    //   this.formdata = data
    //   console.log(this.formdata)
    // });

    // this.businessService.getAll().subscribe(data =>
    //   {
    //     this.formdata=data;
    //     console.log(data)
    //   });
    
    // this.businessService.getBusinessByPhoneNumbers().snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c =>
    //       ({ key: c.payload.key, ...c.payload.val() })
    //     )
    //   )
    // ).subscribe(data => {
    //   this.formdata = data;
    // });

    // .subscribe(data => 
    //   {
    //    this.createBusinessAccountList=data;
    //    this.formdata=this.createBusinessAccountList.find(f=>f.registrationnumber=this.phone);
    //   }
    
    //);

   
  }

AddvaluesToform(){
  if(this.formdata != undefined){
    this.Createbusiness.patchValue({
      businessCategory : this.formdata.categoryname,
      businessName : this.formdata.businessName,
      description : this.formdata.description,
      email : this.formdata.email,
      website : this.formdata.website,
      gstNumber : this.formdata.gstNumber,
      isOwner : this.formdata.isOwner,
      username :this.formdata.username,
      storetiming  :this.formdata.storetiming,
      mobileNumber :this.formdata.mobilenumber,
     // imagedata : this.imageService.getImageData(),
      imagedata : this.formdata.url,
     image :this.formdata.url
    })
    console.log("this is the data",this.imagedata)
  }  
}
  
  popup() {
    this.selectbusiness = true;
  // this.popupservice.openPopup();
  }

  gst() {
    this.showGstPopup = true;
  }

  storetime() {
    this.showtimes = true;
    
  }

  close() {
    this.showGstPopup = false;
  }

  Terms!:boolean
  condition(){
this.Terms= true;
  }
  Conditions(data:any){
    this.Terms = false;
    }
  closeDialog() {
    this.showGstPopup = false;
    //console.log("gstnumber", this.GSTNumber);
    this.sendnumber = this.GSTNumber;

    this.Createbusiness.controls['gstNumber'].setValue(this.GSTNumber);
  }

  onMapClick(event: MouseEvent) {
    this.selectedLat = event.coords.lat;
    this.selectedLng = event.coords.lng;
  }
  file: File | undefined;

  getFile(event: any): void {
    this.file = event.target.files[0];
  }

  clearFile(): void {
    this.file = undefined;
  }

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagedata = e.target?.result;
        this.imageService.setImageData(this.imagedata);
        this.imageService.setfile(this.selectedFiles);
      };
      reader.readAsDataURL(file);
    }
  }

  onFormSubmit(): void {
    if (this.Createbusiness.valid && this.selectedFiles) {

      const file: File | null = this.selectedFiles.item(0);

      const formData: CreateBusinessAccount = {
        categoryname: this.category,
        url:'',

        file: this.selectedFiles[0],
        businessName: this.Createbusiness.value.businessName,
        description: this.Createbusiness.value.description,
        email: this.Createbusiness.value.email,
        website: this.Createbusiness.value.website,
        gstNumber: this.Createbusiness.value.gstNumber,
        isOwner: this.Createbusiness.value.isOwner,
        imagename: '',
        username:this.Createbusiness.value.username,
        mobilenumber: this.Createbusiness.value.mobileNumber,
        storetiming: this.storetiming,
        isApproved: false,
        registrationnumber:this.phone,
        registrationEmail:this.username,
      };

      localStorage.setItem('form-data', JSON.stringify(formData));
      this._router.navigate(['/BusinessRegistrationDetails']);
      

      console.log("FORMATATA",formData)

    } else {
      console.error("Form is not valid or no file selected.");
    }
  }
}

