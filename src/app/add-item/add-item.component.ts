import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogImage } from '../Model/catalog-image';
import { CatalogServiceService } from '../services/catalog-service.service';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { CatalogCURDService } from '../services/catalog-curd.service';
import { CatalogModel } from '../Model/catalog-model';
import { UserloginService } from '../services/userlogin.service';
import { toastersrc } from '../services/toastr.service';
import { catelogStatus } from '../Model/catalog-model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  AddImage!:boolean;
  imagedata: any | string | ArrayBuffer | null = null;
  catalogDetails!:CatalogModel;
  selectedFiles:undefined| FileList[] = [] ;
  selectedFile:any[]=[];
  selectedImages: any[] = [];
  Additemdetails!: FormGroup| any;
  percentage = 0;
catalogUploads:any;
keyName:any;
  formdata:any;
  buttons!:boolean
  phone :any = localStorage.getItem('phoneNumber');
  Email = localStorage.getItem('Email');
  ImagesUrl!:any[];
  spinner!:boolean;
  hide:boolean = false;
  catelogStatus: any;

  data1 = JSON.parse(JSON.stringify(localStorage.getItem('AddItems')));
  details = JSON.parse(this.data1);

  constructor(private fb: FormBuilder, private _router: Router,
    private imageService: ImagesarviceService,private toastar:toastersrc,
    private httpClient: HttpClient, private catalogService: CatalogServiceService,
    private catalogCrudService: CatalogCURDService, private userloginService:UserloginService,
    ) { }

    ngOnInit(){
      if(this.Email != '' && this.Email != undefined){
        this.userloginService.setIsMainHeaderVisible(true); 
      }
    this.Additemdetails = this.fb.group({
      itemname: ['', Validators.required],
      description: ['', Validators.required],
      country: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,63})(\/\S*)?$/)]],
      retailprice: ['', Validators.required],
      sellingprice: ['', Validators.required]
    });

    this.catalogCrudService.data$.subscribe(data => {
      this.keyName = data;
     });
  
  if (this.phone && this.keyName) {
    this.catalogCrudService.getFilesByPhoneNumber(this.phone, this.keyName).subscribe({
      next: data => {
        if(data !== undefined)
        {
          for(var i = 0; i<data.urls.length; i++){
            this.selectedImages[0] = data.urls[0].url;
            this.selectedImages[1] =data.urls[1].url;
            this.selectedImages[2] = data.urls[2].url;
            this.images.push(data.urls[i]);
           // this.Names.push(data.urls[i].name)
           }
          this.formdata=data;
          if(this.formdata.isHidden == true){
            this.hide = true;
          }
          this.buttons = true;
          this.AddvaluesToform();
        console.log("Retrieved Data:", data);
        }
        else{
          this.buttons = false;
        }
      }
    });
  }
  else{
    this.formdata = this.details;
    this.selectedImages[0] = this.imageService.getImageData1();
    this.selectedImages[1] = this.imageService.getImageData2();
    this.selectedImages[2] = this.imageService.getImageData3();
    this.AddvaluesToform();
  }

  }




AddvaluesToform(){
  if( this.formdata!= undefined){
    this.Additemdetails.patchValue({
   
      itemname: this.formdata.Itemname ,
      description: this.formdata.Description  ,
      country: this.formdata.Country,
      link: this.formdata.Link  ,
      sellingprice:this.formdata.SellingPrice  ,
      retailprice: this.formdata.Retailprice  ,
      registrationnumber: this.phone,
     // isApproved: false,
      file: '',
      urls: this.formdata.urls || [],
      names: this.Names || [],
     
    })
  }
}

  enforceNumberValidation(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let val = inputElement.value;

    const splitVal = val.split('.');
    if (splitVal.length == 2 && splitVal[1].length > 2) {
      // user entered more than 2 decimal places
      val = splitVal[0] + '.' + splitVal[1].substr(0, 2);
      inputElement.value = val;
    }
  }
  OnlyNubersAllowed(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (
      (charCode >= 48 && charCode <= 57) || charCode === 46)
    {
      return true;
    } else {
      console.log('charcode restricted is ' + charCode);
      return false;
    }
  }
  onFileSelected(event: any,index: number) {
    this.AddImage = false
    this.images=[];
    this.selectedImages = [];
    const files = event.target.files;
    if (files) {
      this.selectedFile[index] = files;
      const fileCount = files.length;
      for (let i = 0; i < fileCount; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedImages[index].push(e.target?.result);
          this.imageService.setImageData(this.selectedImages[index]);

        };
        const file: File = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      console.log('Image data:', imageData);
      if (index === 0) {
        this.imageService.setImageData1(imageData);
      } else if (index === 1) {
        this.imageService.setImageData2(imageData);
      } else if (index === 2) {
        this.imageService.setImageData3(imageData);
      }
      this.updateSelectedImages(); // Update selectedImages array
    };
    reader.onerror = (error) => {
      console.error('File reading error:', error);
    };
    reader.readAsDataURL(file);
  }
      }


    }
 }
updateSelectedImages(): void {
  this.selectedImages = [
    this.imageService.getImageData1(),
    this.imageService.getImageData2(),
    this.imageService.getImageData3()
  ];
  console.log('Selected images:', this.selectedImages);
}

CatalogImage: any
images:CatalogImage[]  =[];
catalogModel:any;

URLS:any =[];
Names:any =[];
brand!:boolean
Submit() {
  // setTimeout(()=>{
  //   this.spinner= true;
  // },2000)
  if (this.Additemdetails.valid) {
 
    // if(this.selectedFile.length == 0){
    //   this.selectedFile = this.formdata.urls || []
    // }
        this.catalogModel = {
          Itemname: this.Additemdetails.value.itemname,
          Description: this.Additemdetails.value.description,
          Country: this.Additemdetails.value.country,
          Link: this.Additemdetails.value.link,
          SellingPrice: this.Additemdetails.value.sellingprice,
          Retailprice: this.Additemdetails.value.retailprice,
          registrationnumber: this.phone,
          isVerified: false,
          isHidden:false,
          status : catelogStatus.Pending,
          urls: [], // Initialize URLs array
          names: [], // Initialize names array
          file: this.selectedFile,

        };
  if(this.selectedFile.length != 0){
    this.images = []
    // Upload files to storage
    this.catalogCrudService.pushFilesToStorage(this.selectedFile).subscribe(
      catalogImagesUpload => {
        this.catalogUploads = catalogImagesUpload; 
        console.log("this is the catelog data",this.catalogUploads)
         for(var i=0; i<this.catalogUploads.length; i++ ){
          this.images.push({name: this.catalogUploads[i].imageName, url: this.catalogUploads[i].url});
        }
        // Save form data once all files are uploaded
        this.saveFormData();
      },
      (error) => {
        console.error('Error uploading files:', error);
      }
    );
  }else{
     if(this.images.length != 0){
      this.AddImage = false
      this.saveFormData();
     }
     else{
       this.AddImage = true;
     }
  }
  }
}

hideproduct(){
this.hide = true
}

saveFormData() {
 
  const formData = {
    Itemname: this.Additemdetails.value.itemname,
    Description: this.Additemdetails.value.description,
    Country: this.Additemdetails.value.country,
    Link: this.Additemdetails.value.link,
    SellingPrice: this.Additemdetails.value.sellingprice,
    Retailprice: this.Additemdetails.value.retailprice,
    registrationnumber: this.phone,
    isVerified:false,
    isHidden:this.hide,
    status :catelogStatus.Pending,
    file: '',
    urls: this.images,//[{url:"",Name:""},{}] 

    names: this.Names, 
  };

  // Save form data to database
  if(this.keyName !="" && this.keyName != null){

    this.catalogCrudService.updateCatalogKey(this.keyName,formData).then(()=>{
      this.spinner =false
      this._router.navigate(['/MyCatalouge']);
      console.log("Updated Sucessfully");
      this.toastar.success("Product Details Updated Suessfully", "Success")
    })
  }
  else{
  this.catalogCrudService.create(formData).then(() => {
    console.log('Data added successfully');
    this.toastar.success("Product Details Added Suessfully", "Success")
    this._router.navigate(['/MyCatalouge']);
    this.spinner =false
  }).catch((error: any) => {
    console.error('Error adding data:', error);
  });

  localStorage.setItem('AddItems', JSON.stringify(formData));
  //this._router.navigate(['/ItemDetails']);
  }
}



}