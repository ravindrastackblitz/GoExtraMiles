import { Component, OnInit } from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { CatalogCURDService } from '../services/catalog-curd.service';
import { Router } from '@angular/router';
import { CatalogModel } from '../Model/catalog-model';
import { EMPTY, Subscription } from 'rxjs';
import { UserloginService } from '../services/userlogin.service';
import { Scratchcard } from '../Model/scratchcard';
import { DiscountcodeService } from '../services/discountcode.service';

@Component({
  selector: 'app-my-catalouge',
  templateUrl: './my-catalouge.component.html',
  styleUrls: ['./my-catalouge.component.css']
})
export class MyCatalougeComponent implements OnInit {
  phoneNumber: any =  localStorage.getItem('phoneNumber'); // Replace with actual phone number
  images: CatalogModel[] | undefined;
  Images:any=[];
  scratchcardImages:any =[];
  ReadMore:boolean = true
  visible:boolean = false;
  data = JSON.parse(JSON.stringify(localStorage.getItem('form-data')));
  details2 = JSON.parse(this.data);
  details1 = JSON.parse(localStorage.getItem('form-data') || '{}');
  selectedImage:any| string | ArrayBuffer | null = null;
  selectedTab: number = 1;
  details = JSON.parse(localStorage.getItem('AddItems') || '{}');
  imagedata :string | null = null;
  time!: boolean;
  subscription!:Subscription;
  Ischecked!:boolean;
  showImage!: boolean;
  showcatelog:boolean = true
  imagedata1 :string | null = null;
  imagedata2 :string | null = null;
  imagedata3 :string | null = null;
  HostListener:any
  catalogKeyt!:any;
  Email = localStorage.getItem('Email');
  keys:any[] = [];
  spinner!:boolean;

  constructor(
    private imageService: ImagesarviceService,private catalogService:CatalogCURDService,private dataservice:DiscountcodeService,
    private router: Router, private userloginService:UserloginService){
      this.subscription = this.catalogService.getchecked$.subscribe(val => this.Ischecked = val);
  }

  togglePopup(): void {
    this.router.navigate(['/AddItem']);
  }

   selectTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }
  buttonTitle:string = "CREATE NOW"; 
  isUnblurred: boolean = false;

  toggleBlur(): void {
    this.isUnblurred = !this.isUnblurred;
  }
 
  ngOnInit(): void {
  if(this.phoneNumber != '' && this.phoneNumber != undefined){
    if(this.Email != '' && this.Email != undefined){
      this.userloginService.setIsMainHeaderVisible(true); 
    }
    this.imagedata1 = this.imageService.getImageData1();
    this.imagedata2 = this.imageService.getImageData2();
    this.imagedata3 = this.imageService.getImageData3();
    this.imagedata = this.imageService.getImageData();
    if(this.imagedata == "" || this.imagedata == null){
      this.imagedata = this.details2?.url;
     }
     
    this.catalogService.getBusinessByPhoneNumber(this.phoneNumber).subscribe(images1 => {
      setTimeout(()=>{
        this.images = images1;
        //this.catalogKeyt  
        var dta = JSON.parse(JSON.stringify(images1));
        for(var i=0;i<dta.length;i++){
          const img = dta[i].urls[0];
          this.Images.push({images:dta[i].urls[0],key:dta[i].key,isVerifed:dta[i].isVerified,status:dta[i].status,isHidden:dta[i].isHidden});
        }
        if( this.Images != "" ){
          this.showImage = false;
          this.showcatelog = true;
         for(var i = 0; i<this.Images.length; i++){
          this.keys.push(this.Images[i].key)
          this.dataservice.getScratchcardByphone(this.phoneNumber).
          subscribe( data => {
          var prodkeys=data.map((d:any)=>d["productKey"]);
          const distinctprodkeys = prodkeys.filter((n:any, i:any) => prodkeys.indexOf(n) === i);
        this.scratchcardImages =  this.Images.filter((x:any)=>distinctprodkeys.includes(x.key));
          });
         }
        }
        else{
          this.showImage = true;
          this.showcatelog = false;
        }
      },2000)

      setTimeout(()=>{
        this.spinner= true;
      },2000)
     });
  }
  else{
   this.router.navigate([''])
  }
  }

  GotoAddItem(){
    this.router.navigate(['/AddItem']);
    this.catalogService.setKey('');
    localStorage.removeItem('AddItems');
    this.imageService.setImageData1('');
    this.imageService.setImageData2('');
    this.imageService.setImageData3('');
  }
  ImageData(event: any) {
    const key = event.target.dataset.imagename;
    this.catalogService.setKey(key)
    this.router.navigate(['/ItemDetails'])
  }
  
  ScractchcardImage(event: any) {
    const Scrachkey = event.target.dataset.imagekey;
   this.catalogService.SetScrachcard(Scrachkey)
    this.router.navigate(['/ScratchCardInsights']);   
  }
}
