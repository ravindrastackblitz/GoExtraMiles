import { Component,OnInit } from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { Router } from '@angular/router';
import { BusinessRegistrationCRUDService } from '../services/business-registration-crud.service';
import { ImageUploadService } from '../services/image-upload.service';
import { FileUpload } from '../Model/file-upload';
import { CreateBusinessAccount } from '../Model/create-business-account';
import { UserloginService } from '../services/userlogin.service';
import { toastersrc } from '../services/toastr.service';
import { StoretimingService } from '../services/storetiming.service';

@Component({
  selector: 'app-business-registration-details',
  templateUrl: './business-registration-details.component.html',
  styleUrls: ['./business-registration-details.component.css']
})
export class BusinessRegistrationDetailsComponent {
zoom = 12;
latitude = 39.8282;
longitude = -98.5795;
Email = localStorage.getItem('Email');
phone:any = localStorage.getItem('phoneNumber');
data = JSON.parse(JSON.stringify(localStorage.getItem('form-data')));
details = JSON.parse(this.data);
timetable1!:any
key:any =localStorage.getItem('key');
times =JSON.parse(JSON.stringify(localStorage.getItem('storetime1')));
times1 =JSON.parse(this.times);
Timekey:any = localStorage.getItem('Timekey')
store =JSON.parse(JSON.stringify(localStorage.getItem('timetable')));
storetable:any;
clicked!:boolean;
selectedFiles?: FileList;
image1:any;
url1:any;
currentFileUpload!: CreateBusinessAccount;
percentage = 0;
timetable!:boolean;
imagedata :string | null = null;
imagedata1 :string | null = null;
data1!:boolean
IsEdit!:boolean;
Timings:any;
selectedgstFile?: FileList;

constructor(private imageService: ImagesarviceService,
   private router: Router,
   private reg:BusinessRegistrationCRUDService,
  private businessService:BusinessRegistrationCRUDService,
  private  toastar:toastersrc,
  private userloginService:UserloginService,
  private timestore : StoretimingService)
  {
   if(this.store !== undefined)
    {
      this.storetable =JSON.parse(this.store);
   }
  }

ngOnInit(){
  if(this.phone != '' && this.phone != undefined){
    if(this.Email != '' && this.Email != undefined){
      this.userloginService.setIsMainHeaderVisible(true); 
    }
   this.imagedata = this.imageService.getImageData();
   if(this.imagedata == "" || this.imagedata == null){
    this.imagedata = this.details?.url;
    this.imagedata1 = this.details?.url2;
   }
   this.selectedFiles =this.imageService.getfile();
   this.selectedgstFile  = this.imageService.getfile1();
   if(this.details?.storetiming != "Available 24/7"){
    this.data1 = false;
    this.timetable = true;
    this.timetable1 = localStorage.getItem('storetime1');
  }
  else{
    this.data1 = true;
  }
  this.latitude = this.details.businesslocation?.latitude;
  this.longitude = this.details.businesslocation?.longitude;
  }
  else{
    this.router.navigate(['']);
  }
}

setbusinesslocation(){
  this.latitude = this.details.businesslocation.latitude;
  this.longitude = this.details.businesslocation.longitude;
}

Edit(){
this.imageService.setdata(true);
this.router.navigate(['/CreateBusinessAccount']);
}

save() {
  // Assuming this.details contains your form data
  if (this.details != null){
    if(this.details.storetiming != 'Available 24/7'){
         this.details.storetiming = 'Pick Days'
    }
    const file: File | null | undefined = this.selectedFiles?.item(0);
    const file1: File | null | undefined = this.selectedgstFile?.item(0);
    if (file && file1) {
      const createBusinessAccount: CreateBusinessAccount = {
        categoryname: this.details.categoryname,
        imagename: file.name,
        gstImageName:file1.name,
        url: '',
        url2:'',
        file: file,
        gstFile:file1,
        businessName: this.details.businessName,
        description: this.details.description,
        email: this.details.email,
        website: this.details.website,
        gstNumber: this.details.gstNumber,
        isOwner: this.details.isOwner,
        username: this.details.username,
        mobilenumber: this.details.mobilenumber,
        storetiming: this.details.storetiming,
        isApproved: false,
        registrationnumber: this.phone,
        registrationEmail:this.Email,
        businesslocation:this.details.businesslocation
      };

      this.businessService.pushFileToStorage(createBusinessAccount).subscribe({
        next: fileUpload => {
          this.currentFileUpload = fileUpload;
          this.SaveFormdata();
        },
        error: error => {
          console.error(error);
        }
      });   
    }
    else{
      this.currentFileUpload = this.details
      this.SaveFormdata()
    }
  }
}

SaveFormdata(){
  if (this.currentFileUpload.url != null || undefined) {
    if(this.key !="" && this.key != null){
      if(this.currentFileUpload.storetiming == 'Pick Days'){
        if(this.Timekey !='' && this.Timekey != null){
          this.timestore.deleteStoretimings(this.Timekey);
          this.timestore.create(this.storetable).then(() =>{
          });
        }
        else{
          this.timestore.create(this.storetable).then(() =>{
          });
        }
       }
       else{
        this.timestore.deleteStoretimings(this.Timekey);
       }
      this.businessService.updateBusinessBykey(this.key,this.currentFileUpload)
      .then(()=>{
        this.toastar.success("Business Registration Details Updated Suessfully", "Success")
        localStorage.removeItem('key');
        localStorage.removeItem('Timekey');
        this.router.navigate(['/MyCatalouge']);
      })
    }
    else{
      if(this.currentFileUpload.storetiming != 'Available 24/7'){
        this.timestore.create(this.storetable).then(() =>{
        })
       }
      this.businessService.create(this.currentFileUpload)
        .then(() => {
          this.toastar.success("Business Registration Details Added Suessfully", "Success");
          this.router.navigate(['/MyCatalouge']);
        })
        .catch((error: any) => {
          console.error('Error adding data:', error);
        });
    }
  }
}

}
