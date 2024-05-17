// import { Component,HostListener,OnInit } from '@angular/core';
// import { ImagesarviceService } from '../services/imagesarvice.service';
// import { CatalogCURDService } from '../services/catalog-curd.service';
// @Component({
//   selector: 'app-my-catalouge',
//   templateUrl: './my-catalouge.component.html',
//   styleUrls: ['./my-catalouge.component.css']
// })
// export class MyCatalougeComponent {
//   // selectedImage:any| string | ArrayBuffer | null = null;
//   // selectedTab: number = 1;
//   // details = JSON.parse(localStorage.getItem('AddItems') || '{}');
//   // constructor(private imageService: ImagesarviceService){
//   // }
//   // imagedata1 :string | null = null;
//   // imagedata2 :string | null = null;
//   // imagedata3 :string | null = null;
//   // HostListener:any
//   // ngOnInit(){
//   //   this.imagedata1 = this.imageService.getImageData1();
//   //   this.imagedata2 = this.imageService.getImageData2();
//   //   this.imagedata3 = this.imageService.getImageData3();
//   //  }
//   //  selectTab(tabNumber: number) {
//   //   this.selectedTab = tabNumber;
//   // }

//   constructor(private catalogCurdImg:CatalogCURDService)
//   {

//   }


// }
import { Component, OnInit } from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { CatalogCURDService } from '../services/catalog-curd.service';
import { Router } from '@angular/router';
import { CatalogModel } from '../Model/catalog-model';
import { EMPTY } from 'rxjs';

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

  constructor(private imageService: ImagesarviceService,private catalogService:CatalogCURDService,private router: Router){
  }
  showImage!: boolean;
  showcatelog:boolean = true
  imagedata1 :string | null = null;
  imagedata2 :string | null = null;
  imagedata3 :string | null = null;
  HostListener:any
  online!: boolean;

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
 

  ngOnInit(): void {

    this.imagedata1 = this.imageService.getImageData1();
    this.imagedata2 = this.imageService.getImageData2();
    this.imagedata3 = this.imageService.getImageData3();
    this.catalogService.getBusinessByPhoneNumber().subscribe(
      data => console.log("This is the catelog data :",data)
    );
    
      this.imagedata = this.imageService.getImageData();
    this.catalogService.getImagesByPhoneNumber().subscribe(images1 => {
      console.log("catelog data",images1)
      this.images = images1;
      
      var dta = JSON.parse(JSON.stringify(images1));
      for(var i=0;i<dta.length;i++){
        this.Images.push(dta[i][0])
      }
      if( this.Images != "" ){
        this.showImage = false;
        this.showcatelog = true;
      }
      else{
        this.showImage = true;
        this.showcatelog = false;
      }
      console.log("catelog data",this.images)

    });
  }

  ImageData(event: any) {
    const imageName = event.target.dataset.imagename;
    console.log("Image Name:", imageName); // Log imageName
    this.catalogService.getFilesByPhoneNumber(this.phoneNumber, imageName).subscribe(
      uyuy => {
        console.log("Retrieved Data:", uyuy); // Log data retrieved
        if (uyuy) {
          console.log("Found Data:", uyuy);
        } else {
          console.log("No data found for the provided phone number and image name.");
        }
      },
      error => {
        console.error("Error retrieving data:", error);
      }
    );
  }
  
  
  

}
