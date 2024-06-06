import { Component,VERSION } from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { UserloginService } from '../services/userlogin.service';

@Component({
  selector: 'app-promotion-insights',
  templateUrl: './promotion-insights.component.html',
  styleUrls: ['./promotion-insights.component.css']
})
export class PromotionInsightsComponent {
  images: (string | ArrayBuffer | null)[] = [];
  Terms!:boolean
  discount1!: boolean;
  Email = localStorage.getItem('Email');
 
  constructor(private imageService: ImagesarviceService, private userloginService:UserloginService) {}

  popup(){
    this.Terms = true
  }
  Scratchcard1(){
    this.discount1 =false;
  }
  togglePopup1(): void {
    this.discount1 =true;
  }
  Conditions(data:any){
  this.Terms = false;
  }
  ngOnInit() {
    if(this.Email != '' && this.Email != undefined){
      this.userloginService.setIsMainHeaderVisible(true); 
    }
    this.images.push(this.imageService.getImageData1());

  }
}
