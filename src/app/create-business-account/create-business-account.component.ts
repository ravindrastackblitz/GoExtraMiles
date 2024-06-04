
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
formdata:any;
locationdata!:Location
businesslocation!:Location;
categoryname!:string;

Email = localStorage.getItem('Email')
  businesscategory: any;
  constructor(private cate :BusinessCategoryService,
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
if(this.Email != '' && this.Email != undefined){
  this.userloginService.setIsMainHeaderVisible(true); 
} 
document.addEventListener('click', function(event:any) {
  var dropdownContainer = document.getElementById('dropdownContainer');
  if (!dropdownContainer?.contains(event.target as Node)) {
      var dropdownContent = document.getElementById('dropdown');
      !dropdownContent?.style.display;
  }
  
});
  
    this.Createbusiness = this.formBuilder.group({
      categoryname:new FormControl('',[Validators.required]),
     // Image: new FormControl('', []),
      businessName: new FormControl('', [Validators.required]),
      storetiming:new FormControl('',[Validators.required]),
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
        if(business !== undefined){
          this.formdata = business;
              console.log( "data form database",this.formdata);
              this.buttons = true;
              this.imagedata= this.formdata.url;
              localStorage.setItem('key',this.formdata.key);
           //  console.log("this is the key"+this.formdata.url);imagename
           this.selectedFiles = this.formdata.url;
           this.image1 = this.formdata.imagename;
           this.businesslocation = this.formdata.businesslocation;
           this.Createbusiness?.controls['categoryname'].setValue(this.formdata?.categoryname);
           this.categoryname = this.formdata.categoryname;
           if(this.formdata.storetiming != 'Available 24/7'){
             this.formdata.storetiming = 'Pick Days'
             this.Createbusiness?.controls['storetiming'].setValue(this.formdata?.storetiming);
             this.datatime  = this.formdata.storetiming;
             this.timestore.getStoretimings(this.phone).subscribe((data)=>{
              console.log("timings from database",data);
              //localStorage.setItem("timetable",JSON.stringify(data));
             });
           }
           else{
            this.datatime  = this.formdata.storetiming;
           }
         
           this.AddvaluesToform()
        }
        else{
              const some = JSON.parse(JSON.stringify(localStorage.getItem('form-data') )|| '{}');
              this.formdata = JSON.parse(some)
             // console.log(this.formdata);
             this.Createbusiness?.controls['categoryname'].setValue(this.formdata?.categoryname);
             this.categoryname = this.formdata?.categoryname;
             this.imagedata= this.imageService.getImageData();
             this.datatime  = this.formdata?.storetiming;
             if(this.formdata?.storetiming != 'Available 24/7'){
              //this.formdata.storetiming = 'Pick Days'
              this.Createbusiness?.controls['storetiming'].setValue(this.formdata?.storetiming);
              this.datatime  = this.formdata?.storetiming;
            }
            else{
             this.datatime  = this.formdata.storetiming;
            }
             this.businesslocation = this.formdata?.businesslocation;
             localStorage.removeItem('key')
              this.buttons = false;
              this.AddvaluesToform()
            } 
      });
    

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
     
      if(this.selectedFiles == undefined){
        this.brand =true;
       console.log("hello98998");
      }
      else{
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
     



    } else {
      console.error("Form is not valid or no file selected.");
    }
  }
//   toggleDropdown() {
//     const dropdownContent = document.getElementById('dropdown');
//     if (dropdownContent) {
//       dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
//     }
//   }

//   filterFunction() {
//     const input = document.getElementById('searchInput') as HTMLInputElement;
//     const filter = input.value.toUpperCase();
//     const dropdown = document.getElementById('dropdown');
//     if (dropdown) {
//       const labels = dropdown.getElementsByTagName('label');
//       for (let i = 0; i < labels.length; i++) {
//         const label = labels[i];
//         const txtValue = label.textContent || label.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           label.style.display = '';
//         } else {
//           label.style.display = 'none';
//         }
//       }
//     }
//   }
//   selectOption(option: string) {
//     const selectionBox = document.getElementById('selectionBox');
//     if (selectionBox) {
//         selectionBox.textContent = option;
//         this.toggleDropdown();
//     }
// }

// addNewOption() {
//   const newOption = prompt("Enter the new option:");
//   if (newOption) {
//       const dropdown = document.getElementById('dropdown');
//       if (dropdown) {
//           // Check if the option already exists
//           const existingOptions = Array.from(dropdown.querySelectorAll('input[type="radio"]')) as HTMLInputElement[];
//           const optionExists = existingOptions.some(option => option.value === newOption);
          
//           if (!optionExists) {
//               const newLabel = document.createElement('label');
//               newLabel.innerHTML = `<input type="radio" name="option" value="${newOption}" (click)="selectOption(this)"> ${newOption}`;
//               dropdown.appendChild(newLabel);
//           } else {
//               alert("Option already exists!");
//           }
//       }
//   }
// }

@ViewChild('dropdownContainer') dropdownContainer!: ElementRef;
@ViewChild('dropdown') dropdown!: ElementRef;
@ViewChild('searchInput') searchInput!: ElementRef;

options: string[] = ['Option 1', 'Option 2'];

toggleDropdown() {
    this.dropdown.nativeElement.style.display = this.dropdown.nativeElement.style.display === 'block' ? 'none' : 'block';
}

handleInput(event:any) {
  const char = event.target.value.trim().toLowerCase(); 
    this.cate.GetAllCategorys().subscribe((res:any) => {
      const filteredResults = res.filter((item:any )=> item.label?.toLowerCase().includes(char) || item.value?.toLowerCase() === char);
    //  console.log("Filtered results:", filteredResults);
      this.businesscategory =filteredResults;
    if (event.key === 'Enter') {
        const inputValue = (this.searchInput.nativeElement as HTMLInputElement).value.trim();
        if (inputValue !== '') {
            const isExisting = this.options.some(option => option === inputValue);
            if (!isExisting) {
                this.options.push(inputValue);
            } else {
                alert('Selected: ' + inputValue);
            }
            (this.searchInput.nativeElement as HTMLInputElement).value = ''; // Clear input field
            this.toggleDropdown();
        }
    }
})
}
selectOption(option: string) {
    this.dropdownContainer.nativeElement.textContent = option;
    this.toggleDropdown();
};

// Hide dropdown when clicking outside
onClickOutside(event: MouseEvent) {
    if (!this.dropdownContainer.nativeElement.contains(event)) {
        this.dropdown.nativeElement.style.display = 'none';
    }
};


}

