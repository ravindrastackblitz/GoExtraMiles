
import { Component, VERSION ,OnInit, Input} from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { UserloginService } from '../services/userlogin.service';
import { Subscription } from 'rxjs';
 import { DiscountcodeService } from '../services/discountcode.service';
import { CatalogCURDService } from '../services/catalog-curd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scratch-card-insights',
  templateUrl: './scratch-card-insights.component.html',
  styleUrls: ['./scratch-card-insights.component.css']
})
export class ScratchCardInsightsComponent {
  @Input() label: string = '';
  childValue: any = '';
  toDate: Date = new Date();
  numDate=1590319189931;
  images: (string | ArrayBuffer | null)[] = [];
  Terms!:boolean
  snumber:any;
  
  subscription!:Subscription;
  key!:string;
  phoneNumber: any =  localStorage.getItem('phoneNumber');
  promocode : any;
  popup(){
    this.Terms = true
  }
  
  Conditions(data:any){
  this.Terms = false;
  }
  constructor(private imageService: ImagesarviceService,private userloginService:UserloginService,
    private dataService: DiscountcodeService,private catalog:CatalogCURDService,private router:Router) {
  
  }
  Email = localStorage.getItem('Email');
 
  ngOnInit() {
   if(this.phoneNumber != ''&& this.phoneNumber != undefined){
    if(this.Email != '' && this.Email != undefined){
      this.userloginService.setIsMainHeaderVisible(true); 
    }

    this.images.push(this.imageService.getImageData1());

     this.dataService.data$.subscribe(data => {
      this.label = data;
    });

    this.catalog.getScrachcard$.subscribe(image =>{
        this.key = image
      }
    );
    

    this.catalog.getFilesByPhoneNumber(this.phoneNumber, this.key).subscribe({
      next: data => {
        if(data !== undefined){
          console.log("files data",data);
          for(var i=0; i<data.urls.length; i++){
            this.images = data.urls[0].url;
          }
          this.dataService.getScratchcardByKey1(this.key).subscribe({
            next :details =>{
              if(details != undefined){
                console.log("scratchcarddetails",details);
                const  scratchcard =[];
                for(var i=0; i<details.length; i++ ){
                scratchcard.push(details[i].scratchcardCode)
                }
                this.promocode = scratchcard
              }
            }
          })
        }
      }
    });
   }
   else{
    this.router.navigate([''])
   }
  
}
}

