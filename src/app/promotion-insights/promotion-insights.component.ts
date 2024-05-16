import { Component,VERSION } from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';

@Component({
  selector: 'app-promotion-insights',
  templateUrl: './promotion-insights.component.html',
  styleUrls: ['./promotion-insights.component.css']
})
export class PromotionInsightsComponent {
  images: (string | ArrayBuffer | null)[] = [];
  Terms!:boolean
  discount1!: boolean;

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
  constructor(private imageService: ImagesarviceService) {}

  ngOnInit() {
    this.images.push(this.imageService.getImageData1());

  }
  // selectedImage:any| string | ArrayBuffer | null = null;

  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.selectedImage = e.target?.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

}
