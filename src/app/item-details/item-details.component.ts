import { Component,HostListener,OnInit, Output,EventEmitter } from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { DiscountcodeService } from '../services/discountcode.service';

import { Router, UrlSegment } from '@angular/router';
import { CatalogCURDService } from '../services/catalog-curd.service';
import { CatalogModel } from '../Model/catalog-model';
import { UserloginService } from '../services/userlogin.service';
import { Scratchcard } from '../Model/scratchcard';
import {ScratchcardStatus}  from '../Model/scratchcard'

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {
  selectedImage:any| string | ArrayBuffer | null = null;
  discount!:boolean;
  discount1!:boolean;
  discountcode!:string;
  scratchnumber!:string;
  formdata:any=[];
  Names:any =[];
data1 = JSON.parse(JSON.stringify(localStorage.getItem('AddItems')));
  details = JSON.parse(this.data1);
  imagedata1 :string | null = null;
  imagedata2 :string | null = null;
  imagedata3 :string | null = null;
  HostListener:any;
  catalogModel!:CatalogModel;
  phoneNumber: any =  localStorage.getItem('phoneNumber');
  keyName:any;
  product!:string
  language: string = ''; // Variable to store the selected language
  dropdownVisible: boolean = false; // Variable to control the visibility of the dropdown menu
  textBoxData: string = '';

  images: any;
Scratchcarddetails :any 
data:any

  Ischecked!:boolean;

  // clicktoggle()
  // {
  //   this.details =(this.details === 'empty') ? "JSON.parse(localStorage.getItem('AddItems') || '{}')" : 'empty';
  // }
  clicktoggle(){
  // if (this.details === "none") {
  //   this.details  = "block";
  // } else {
  //   this.details  = "none";
  // }
}
togglePopup(): void {
  this.discount =true;
}
togglePopup1(): void {
  this.discount1 =true;
}
Scratchcard(){
  this.discount =false;
  this.dataService.sendData(this.textBoxData);
const data1 :Scratchcard = {
  isApproved: false,
  scratchcardCode :this.textBoxData,
  productKey:this.product,
  status: ScratchcardStatus.Pending
}
  this.dataService.create(data1)
  this.catalogCrud.setchecked(true);
  this._router.navigate(['/MyCatalouge']);
}
Scratchcard1(){
  this.discount1 =false;
}

datadelete()
{
  this.discount1 =false;
  this.details = '';
  this.catalogCrud.deletecatalouge(this.keyName)
  this._router.navigate(['/MyCatalouge']);
}

  // Function to change the language
  changeLanguage(language: string) {
    this.language = language;
  }
  edit()
  {
    this._router.navigate(['/BusinessRegistrationDetails']);
  }

  GetDetails()
{
  this._router.navigate(['/MyCatalouge']);
}

  // Function to toggle the visibility of the dropdown menu
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  update()
  {
    this._router.navigate(['/AddItem']);

  }

  // Function to close the dropdown menu when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).classList.contains('dropbtn')) {
      this.dropdownVisible = false;
    }
  }
constructor(private imageService: ImagesarviceService, private _router: Router, 
  private catalogCrud:CatalogCURDService,private dataService:DiscountcodeService,private userloginService:UserloginService){
}
Terms!:boolean
popup(){
  this.Terms = true
}

Conditions(data:any){
this.Terms = false;
}



Email = localStorage.getItem('Email');

ngOnInit(){
  if(this.Email != '' && this.Email != undefined){
    this.userloginService.setIsMainHeaderVisible(true); 
  }

  this.imagedata1 = this.imageService.getImageData1();
  this.imagedata2 = this.imageService.getImageData2();
  this.imagedata3 = this.imageService.getImageData3();

  this.catalogCrud.data$.subscribe(data => {
    this.keyName = data;
   });

if (this.phoneNumber && this.keyName) {
  this.catalogCrud.getFilesByPhoneNumber(this.phoneNumber, this.keyName).subscribe({
    next: data => {
      if(data !== undefined){
      console.log("Retrieved Data:", data);
     for(var i = 0; i<data.urls.length; i++){
      this.imagedata1 = data.urls[0].url;
      this.imagedata2 =data.urls[1].url;
      this.imagedata3 = data.urls[2].url;
     }
      
      this.details = data;
       this.product =this.details.key;
      this.ItemDetails()
      
      }
       else {
        this.ItemDetails()
        console.log("No data found for the provided phone number and image name.");
      }
    }
  }
   
  
   
  );
}
}

ItemDetails(){
  this.details.patchValue({
    Itemname: this.details.Itemname ,
          Description: this.details.Description  ,
          Country: this.details.Country,
          Link: this.details.Link  ,
          SellingPrice:this.details.SellingPrice  ,
          Retailprice: this.details.Retailprice  ,
          registrationnumber: this.phoneNumber,
          isApproved: false,
          file: '',
          isHidden:this.details.status,
          urls: this.details.urls || [],
          names: this.Names || []
          
  })

}
 
}
