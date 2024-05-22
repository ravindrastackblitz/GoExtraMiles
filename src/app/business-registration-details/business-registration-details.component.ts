import { Component,OnInit } from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { Router } from '@angular/router';
import { BusinessRegistrationCRUDService } from '../services/business-registration-crud.service';
import { ImageUploadService } from '../services/image-upload.service';
import { FileUpload } from '../Model/file-upload';
import { CreateBusinessAccount } from '../Model/create-business-account';
import { UserloginService } from '../services/userlogin.service';
import { toastersrc } from '../services/toastr.service';

@Component({
  selector: 'app-business-registration-details',
  templateUrl: './business-registration-details.component.html',
  styleUrls: ['./business-registration-details.component.css']
})
export class BusinessRegistrationDetailsComponent {

  // public latitude!: number;
  // public longitude!: number;
  // public zoom!: number;
 zoom = 4;
 latitude = 39.8282;
 longitude = -98.5795;
  
  // category = localStorage.getItem('category');
  // gstnumber = localStorage.getItem('gstnumber');
  data = JSON.parse(JSON.stringify(localStorage.getItem('form-data')));
details = JSON.parse(this.data);
timetable1!:any
key:any =localStorage.getItem('key');
times =JSON.parse(JSON.stringify(localStorage.getItem('storetime1')));
times1 =JSON.parse(this.times);
  imagedata :string | null = null;
  data1!:boolean
  IsEdit!:boolean

constructor(private imageService: ImagesarviceService, private router: Router,private reg:BusinessRegistrationCRUDService,
  private businessService:BusinessRegistrationCRUDService,private  toastar:toastersrc,
  private userloginService:UserloginService){
}
Email = localStorage.getItem('Email')
phone = localStorage.getItem('phoneNumber')
ngOnInit(){
 
  if(this.Email != '' && this.Email != undefined){
    this.userloginService.setIsMainHeaderVisible(true); 
  }
 this.imagedata = this.imageService.getImageData();
 if(this.imagedata == "" || this.imagedata == null){
  this.imagedata = this.details?.url;
 }
 this.latitude = this.details.businesslocation.latitude;
 this.longitude = this.details.businesslocation.longitude;
 
 this.selectedFiles =this.imageService.getfile()
 if(this.details?.storetiming == "Pick Days"){
  this.data1 = false;
  this.timetable = true;
  this.timetable1 = localStorage.getItem('storetime1');
}
else{
  this.data1 = true;
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
selectedFiles?: FileList;
image1:any;
url1:any;
currentFileUpload!: CreateBusinessAccount;

percentage = 0;
timetable!:boolean

save() {
  // Assuming this.details contains your form data
  if (this.details != null) {
    const file: File | null | undefined = this.selectedFiles?.item(0);
    if (file) {
      const createBusinessAccount: CreateBusinessAccount = {
        categoryname: this.details.categoryname,
        imagename: '',
        url: '',
        file: file,
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
       //   console.log('fileUpload details:', fileUpload);
          this.currentFileUpload = fileUpload;

          if (this.currentFileUpload.url != null || undefined) {
            if(this.key !="" && this.key != null){
              this.businessService.updateBusinessBykey(this.key,this.currentFileUpload)
              .then(()=>{
                console.log('Successfully updated');
                this.toastar.success("Business Registration Details Updated Suessfully", "Success")
                localStorage.removeItem('key');
              })
            }
            else{
              this.businessService.create(this.currentFileUpload)
                .then(() => {
                  console.log('Data added successfully');
                  this.toastar.success("Business Registration Details Added Suessfully", "Success")
                })
                .catch((error: any) => {
                  console.error('Error adding data:', error);
                });
            }
          }
        },
        error: error => {
          console.log(error);
        }
      });   
    }

  }
  this.router.navigate(['/MyCatalouge']);
}

}
