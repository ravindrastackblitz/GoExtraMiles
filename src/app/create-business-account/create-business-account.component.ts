import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
import { Location } from '../Model/location';
import { MouseEvent } from '@agm/core';
import { map,switchMap,take } from 'rxjs/operators';
import { listChanges } from '@angular/fire/compat/database';
import { UserloginService } from '../services/userlogin.service';
import { Subscription } from 'rxjs';
import { StoretimingService } from '../services/storetiming.service';
@Component({
  selector: 'app-create-business-account',
  templateUrl: './create-business-account.component.html',
  styleUrls: ['./create-business-account.component.css'],  
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
formdata:any;
locationdata!:Location
businesslocation!:Location;
categoryname!:string;

Email = localStorage.getItem('Email')
fb: any;
  constructor(private FB: FormBuilder,
    private popupservice: PopupService,
    private gstservice: GstService,
    private imageService: ImagesarviceService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private httpClient: HttpClient,
    private uploadService: ImageUploadService,
    private businessService: BusinessRegistrationCRUDService,
    private userloginService:UserloginService,
    private timestore : StoretimingService
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

Location(event:any){
console.log("location details :",event)
this.locationdata=event;
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


  ngOnInit() {
    if (this.phone != '' && this.phone != undefined) {
      if (this.Email != '' && this.Email != undefined) {
        this.userloginService.setIsMainHeaderVisible(true);
      }
      this.myForm = this.FB.group({
        option: [this.options]
      });
      this.Createbusiness = this.formBuilder.group({
        categoryname: new FormControl('', [Validators.required]),
        businessName: new FormControl('', [Validators.required]),
        storetiming: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        website: new FormControl('', [Validators.required]),
        gstNumber: new FormControl('', [Validators.required]),
        isOwner: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        mobileNumber: new FormControl('', [Validators.required]),
        termsAndConditions: [false, Validators.requiredTrue],
      });

      this.businessService.getBusinessRecordByKey1(this.phone).subscribe(
        business => {
          if (business !== undefined) {
            this.formdata = business;
            console.log("data form database", this.formdata);
            this.buttons = true;
            this.imagedata = this.formdata.url;
            this.imagedata1 = this.formdata.url2;
            localStorage.setItem('key', this.formdata.key);
            this.selectedFiles = this.formdata.url;
            this.selectedgstfile = this.formdata.url2;
            this.image1 = this.formdata.imagename;
           
           this.GSTNumber = this.formdata.gstNumber;
            this.businesslocation = this.formdata.businesslocation;
            this.Createbusiness?.controls['categoryname'].setValue(this.formdata?.categoryname);
            this.categoryname = this.formdata.categoryname;
            if (this.formdata.storetiming != 'Available 24/7') {
              this.formdata.storetiming = 'Pick Days'
              this.Createbusiness?.controls['storetiming'].setValue(this.formdata?.storetiming);
              this.datatime = this.formdata.storetiming;
              this.timestore.getStoretimings(this.phone).subscribe((data) => {
                console.log("timings from database", data);
              });
            }
            else {
              this.datatime = this.formdata.storetiming;
            }

            this.AddvaluesToform()
          }
          else {
            const some = JSON.parse(JSON.stringify(localStorage.getItem('form-data')) || '{}');
            this.formdata = JSON.parse(some)
            this.Createbusiness?.controls['categoryname'].setValue(this.formdata?.categoryname);
            this.categoryname = this.formdata?.categoryname;
            this.imagedata = this.imageService.getImageData();
            this.imagedata1 = this.imageService.getImageData4();
            this.datatime = this.formdata?.storetiming;
            this.GSTNumber = this.formdata.gstNumber;
            if (this.formdata?.storetiming != 'Available 24/7') {
              this.Createbusiness?.controls['storetiming'].setValue(this.formdata?.storetiming);
              this.datatime = this.formdata?.storetiming;
            }
            else {
              this.datatime = this.formdata.storetiming;
            }
            this.businesslocation = this.formdata?.businesslocation;
            localStorage.removeItem('key')
            this.buttons = false;
            this.AddvaluesToform()
          }
        });

            // if(this.imagedata != '' && this.imagedata != undefined){
            //   this.brand = false;
            // }

    }
     else{
      this._router.navigate([''])
     }
    

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
    //   imagedata : this.formdata.url,
    //  image :this.formdata.imagename
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
    this.brand =false;
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
brand!:boolean
  onFormSubmit(): void {
    if (this.Createbusiness.valid ) {
     
      if(this.selectedFiles == undefined && this.imagedata == null){
        this.brand =true;
       console.log("hello98998");
      }
      else{
        this.brand =false;
        if(this.selectedFiles != undefined){
          const file: File  = this.selectedFiles![0];
          this.brand =false;
          const formData: CreateBusinessAccount = {
            categoryname: this.category,
            url:this.imagedata,
            file: file,
            businessName: this.Createbusiness.value.businessName,
            description: this.Createbusiness.value.description,
            email: this.Createbusiness.value.email,
            website: this.Createbusiness.value.website,
            gstNumber: this.Createbusiness.value.gstNumber,
            isOwner: this.Createbusiness.value.isOwner,
            imagename: this.image1,
            username:this.Createbusiness.value.username,
            mobilenumber: this.Createbusiness.value.mobileNumber,
            storetiming: this.storetiming,
            isApproved: false,
            registrationnumber:this.phone,
            registrationEmail:this.Email,
            businesslocation:this.locationdata
          };
    
          localStorage.setItem('form-data', JSON.stringify(formData));
          this._router.navigate(['/BusinessRegistrationDetails']);
          console.log("FORMATATA",formData)
        }
        else{
          const formData: CreateBusinessAccount = {
            categoryname: this.category,
            url:this.imagedata,
            file:this.imagedata,
            businessName: this.Createbusiness.value.businessName,
            description: this.Createbusiness.value.description,
            email: this.Createbusiness.value.email,
            website: this.Createbusiness.value.website,
            gstNumber: this.Createbusiness.value.gstNumber,
            isOwner: this.Createbusiness.value.isOwner,
            imagename: this.image1,
            username:this.Createbusiness.value.username,
            mobilenumber: this.Createbusiness.value.mobileNumber,
            storetiming: this.storetiming,
            isApproved: false,
            registrationnumber:this.phone,
            registrationEmail:this.Email,
            businesslocation:this.locationdata
          };
    
          localStorage.setItem('form-data', JSON.stringify(formData));
          this._router.navigate(['/BusinessRegistrationDetails']);
          console.log("FORMATATA",formData)
        }

      }
     



    } else {
      console.error("Form is not valid or no file selected.");
    }
  }


  //data.....................................................
  name = 'Angular';
  options = [
    'Option 1',
    'Option 2',
    'Option 3'
  ];
  myForm!: FormGroup;

  onSubmit() {
    console.log(this.myForm.value);
  }

  onItemAdded(itemToBeAdded:any) {
    console.log('Item to be added: ', itemToBeAdded);
  }
}

