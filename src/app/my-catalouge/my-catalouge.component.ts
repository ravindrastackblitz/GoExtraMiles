import { Component, OnInit } from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { CatalogCURDService } from '../services/catalog-curd.service';
import { Router } from '@angular/router';
import { CatalogModel } from '../Model/catalog-model';
import { EMPTY } from 'rxjs';
import { UserloginService } from '../services/userlogin.service';

@Component({
  selector: 'app-my-catalouge',
  templateUrl: './my-catalouge.component.html',
  styleUrls: ['./my-catalouge.component.css']
})
export class MyCatalougeComponent implements OnInit {
  phoneNumber: any =  localStorage.getItem('phoneNumber'); // Replace with actual phone number
  images: CatalogModel[] | undefined;
  Images:any=[]


//   toDate: Date = new Date();
// numDate=1590319189931;
//readmore variable, its true than read more string will print
ReadMore:boolean = true

//hiding info box
visible:boolean = false
  details1 = JSON.parse(localStorage.getItem('form-data') || '{}');
  selectedImage:any| string | ArrayBuffer | null = null;
  selectedTab: number = 1;
  details = JSON.parse(localStorage.getItem('AddItems') || '{}');
  imagedata!: string | null;
  time!: boolean;

  constructor(
    private imageService: ImagesarviceService,private catalogService:CatalogCURDService,
    private router: Router, private userloginService:UserloginService){
  }
  showImage!: boolean;
  showcatelog:boolean = true
  imagedata1 :string | null = null;
  imagedata2 :string | null = null;
  imagedata3 :string | null = null;
  HostListener:any
  online!: boolean;
catalogKeyt!:any;
  togglePopup(): void {
    this.online =true;
  }

  confirm(){
    this.online =false;
    this.showImage = true;
     this.router.navigate(['/AddItem']);
  }

  
  cancle(){
    this.online =false;
    this.router.navigate(['/MyCatalouge']);
  }
 
   selectTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }
  buttonTitle:string = "CREATE NOW"; 
 
  Email = localStorage.getItem('Email')
  ngOnInit(): void {

    if(this.Email != '' && this.Email != undefined){
      this.userloginService.setIsMainHeaderVisible(true); 
    }
    this.imagedata1 = this.imageService.getImageData1();
    this.imagedata2 = this.imageService.getImageData2();
    this.imagedata3 = this.imageService.getImageData3();
   

    
      this.imagedata = this.imageService.getImageData();

    this.catalogService.getBusinessByPhoneNumber(this.phoneNumber).subscribe(images1 => {
      console.log("catelog data",images1)
      this.images = images1;
      //this.catalogKeyt
      
      var dta = JSON.parse(JSON.stringify(images1));
      for(var i=0;i<dta.length;i++){
        const key = dta[i].key;
        const img = dta[i].urls[0];
        this.Images.push({images:dta[i].urls[0],key:dta[i].key});
      }
      console.log("yqwyqwuyw 4334",this.Images);
      if( this.Images != "" ){
        this.showImage = false;
        this.showcatelog = true;
      }
      else{
        this.showImage = true;
        this.showcatelog = false;
      }

    });
  }


  ImageData(event: any) {
    const key = event.target.dataset.imagename;

    console.log("Image Name:", key); // Log imageName
    this.router.navigate(['/ItemDetails'])
    localStorage.setItem("KEY",key)
    
  }
  
  
  

}
