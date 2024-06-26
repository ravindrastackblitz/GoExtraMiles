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
import { BusinessCategoryService } from '../services/business-category.service';
import { SelectCategory } from '../Model/select-category';
@Component({
  selector: 'app-create-business-account',
  templateUrl: './create-business-account.component.html',
  styleUrls: ['./create-business-account.component.css'],  
})
export class CreateBusinessAccountComponent implements OnInit {
  @ViewChild('productsElement') productsElement!: ElementRef;
  selectedFiles?: FileList;
  selectedgstfile?: FileList;
  image1:any;
  image2:any;
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
  imagedata1: any | string | ArrayBuffer | null = null;
  category: string = "";
  storetiming: string = "";
  phone :any = localStorage.getItem('phoneNumber');
  buttons!:boolean;
  datatime :string ="";
  username:string ='';
  brand!:boolean
  subscription: Subscription;
  formdata:any;
  locationdata!:Location
  businesslocation!:Location;
  categoryname!:string;
  Clicked!:boolean;
  Terms!:boolean;
  file: File | undefined;
  dropdownselected!:string;
  options:any[]=[]
  businesscategory:any[]=[]
  gstfile:any;
  gstfilename:any;
  GstFile!: File;
  brandfile!:File;
  Email = localStorage.getItem('Email')
  fb: any;
  myForm!: FormGroup;

  constructor
  (
    private FB: FormBuilder,
    private popupservice: PopupService,
    private gstservice: GstService,
    private imageService: ImagesarviceService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private httpClient: HttpClient,
    private selectbusines: BusinessCategoryService,
    private businessService: BusinessRegistrationCRUDService,
    private userloginService:UserloginService,
    private timestore : StoretimingService
  ) 
    {
      this.subscription = this.userloginService.getusername$.subscribe(name => this.username = name);
    }


  OnlyNubersAllowed(event:any):boolean
  {
  const charCode = (event.which)?event.which:event.keyCode;
  if(charCode > 31 && (charCode < 48 || charCode >57)){
    return false;
  }
  return true;
}

Location(event:any){
this.locationdata=event;
}

  selectedname(data:any){
  this.category = data;
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
      
      this.selectbusines.GetAllCategorys().subscribe(res => {
        for(var i =0; i<res.length; i++){
          this.options.push(res[i].value)
        }
        })

      this.businessService.getBusinessRecordByKey1(this.phone).subscribe(
        business => {
          if (business !== undefined) {
            this.formdata = business;
            this.buttons = true;
            this.imagedata = this.formdata.url;
            this.gstfile = this.formdata.url2;
            localStorage.setItem('key', this.formdata.key);
            this.image1 = this.formdata.imagename;
           this.gstfilename = this.formdata.gstImageName
           this.GSTNumber = this.formdata.gstNumber;
            this.businesslocation = this.formdata.businesslocation;
            this.Createbusiness?.controls['categoryname'].setValue(this.formdata?.categoryname);
            this.categoryname = this.formdata.categoryname;
            this.dropdownselected = this.formdata.categoryname;
            if (this.formdata.storetiming != 'Available 24/7') {
              this.formdata.storetiming = 'Pick Days'
              this.Createbusiness?.controls['storetiming'].setValue(this.formdata?.storetiming);
              this.datatime = this.formdata.storetiming;
              this.timestore.getStoretimings(this.phone).subscribe({
                next: (data) => {
                  if(data != undefined){
                    localStorage.setItem('timetable',JSON.stringify(data.storerecords));
                    localStorage.setItem("Timekey",data.key);
                  }
                },
                error: (error) => {
                  console.error("Error fetching store timings:", error);
                },
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
            this.dropdownselected = this.formdata.categoryname;
            localStorage.removeItem('key')
            this.buttons = false;
            this.AddvaluesToform()
          }
        });
    }
     else{
      this._router.navigate([''])
     }
    
   }
   ngAfterViewInit() {
    if (this.brand == true) {
      this.scrollIntoView();
    }
  }  
  scrollIntoView() {
    if (this.productsElement) {
      this.productsElement.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  }  

  
AddvaluesToform(){
  if(this.formdata != undefined){
    this.Createbusiness.patchValue({
      categoryname : this.formdata.categoryname,
      businessName : this.formdata.businessName,
      description : this.formdata.description,
      email : this.formdata.email,
      website : this.formdata.website,
      gstNumber : this.formdata.gstNumber,
      isOwner : this.formdata.isOwner,
      username :this.formdata.username,
      storetiming  :this.formdata.storetiming,
      mobileNumber :this.formdata.mobilenumber,
    })
  }  
}
  
  popup() {
    this.selectbusiness = true;
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

  condition(){
this.Terms= true;
  }

  Conditions(data:any){
    this.Terms = false;
    }

  closeDialog() {
    this.showGstPopup = false;
    this.sendnumber = this.GSTNumber;
    this.Createbusiness.controls['gstNumber'].setValue(this.GSTNumber);
  }

  onMapClick(event: MouseEvent) {
    this.selectedLat = event.coords.lat;
    this.selectedLng = event.coords.lng;
  }

  getFile(event: any): void {
    this.gstfile = "";
    this.gstfilename = '';
    this.file = event.target.files[0];
    this.brand = false;
    this.selectedgstfile= event.target.files;
    const file1: File = event.target.files[0];
    if (file1) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagedata1 = e.target?.result;
        this.imageService.setImageData4(this.imagedata1);
        this.imageService.setfile1(this.selectedgstfile);
      };
      reader.readAsDataURL(file1);
    }
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

  onFormSubmit(): void {
    if (this.Createbusiness.valid ) {
      if(this.selectedFiles == undefined && this.imagedata == null){
        this.brand =true;
        this.ngAfterViewInit();
      }
      else{
        this.brand =false;
        if(this.selectedFiles != undefined){
          this.brand =false;
          this.Clicked=true;
          const file: File  = this.selectedFiles![0];
          if(this.selectedgstfile != null){
            const file1: File  = this.selectedgstfile![0]; 
            const formData: CreateBusinessAccount = {
              categoryname: this.category,
              url:'',
              url2:'',
              file: file,
              gstFile:file1,
              businessName: this.Createbusiness.value.businessName,
              description: this.Createbusiness.value.description,
              email: this.Createbusiness.value.email,
              website: this.Createbusiness.value.website,
              gstNumber: this.Createbusiness.value.gstNumber,
              isOwner: this.Createbusiness.value.isOwner,
              imagename: file.name,
              gstImageName:file1.name,
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
          }else{
            const formData: CreateBusinessAccount = {
              categoryname: this.category,
              url:'',
              url2:'',
              file: file,
              gstFile:this.GstFile,
              businessName: this.Createbusiness.value.businessName,
              description: this.Createbusiness.value.description,
              email: this.Createbusiness.value.email,
              website: this.Createbusiness.value.website,
              gstNumber: this.Createbusiness.value.gstNumber,
              isOwner: this.Createbusiness.value.isOwner,
              imagename: file.name,
              gstImageName:'',
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
          }
        }
        else{
          const formData: CreateBusinessAccount = {
            categoryname: this.category,
            url:this.imagedata,
            url2:this.gstfile,
            file:this.brandfile,
            gstFile:this.GstFile,
            businessName: this.Createbusiness.value.businessName,
            description: this.Createbusiness.value.description,
            email: this.Createbusiness.value.email,
            website: this.Createbusiness.value.website,
            gstNumber: this.Createbusiness.value.gstNumber,
            isOwner: this.Createbusiness.value.isOwner,
            imagename: this.image1,
            gstImageName:this.gstfilename,
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
        }
      }

    } else {
      console.error("Form is not valid or no file selected.");
    }
  }

  onItemAdded(itemToBeAdded:any) {
    if (itemToBeAdded.trim() !== '') {
      const data : SelectCategory ={
        label : itemToBeAdded,
        value : itemToBeAdded
      }
      this.selectbusines.Create(data);
    } 
  }
}

