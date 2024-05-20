// import { Component,VERSION } from '@angular/core';
// import { ImagesarviceService } from '../imagesarvice.service';
// @Component({
//   selector: 'app-scratch-card-insights',
//   templateUrl: './scratch-card-insights.component.html',
//   styleUrls: ['./scratch-card-insights.component.css']
// })
// export class ScratchCardInsightsComponent {
//   // selectedImage:any| string | ArrayBuffer | null = null;

//   // onFileSelected(event: any) {
//   //   const file: File = event.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onload = (e) => {
//   //       this.selectedImage = e.target?.result;
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // }
//   selectedImage:any| string | ArrayBuffer | null = null;

//   details = JSON.parse(localStorage.getItem('AddItems') || '{}');
//   constructor(private imageService: ImagesarviceService){
//   }
//   imagedata1 :string | null = null;
//   imagedata2 :string | null = null;
//   imagedata3 :string | null = null;
//   image :string |null = null;
//   HostListener:any
//   ngOnInit(){
//     this.image = this.imageService.getImageData1();
//     this.image = this.imageService.getImageData2();
//     this.image = this.imageService.getImageData3();
//    }
// }
import { Component, VERSION ,OnInit, Input} from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { UserloginService } from '../services/userlogin.service';
import { Subscription } from 'rxjs';
 import { DiscountcodeService } from '../services/discountcode.service';
import { CatalogCURDService } from '../services/catalog-curd.service';

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
  popup(){
    this.Terms = true
  }
  
  Conditions(data:any){
  this.Terms = false;
  }
  constructor(private imageService: ImagesarviceService,private userloginService:UserloginService,
    private dataService: DiscountcodeService,private catalog:CatalogCURDService) {
  
  }
  Email = localStorage.getItem('Email');
  ngOnInit() {
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
        }
      }
    })

}
}

