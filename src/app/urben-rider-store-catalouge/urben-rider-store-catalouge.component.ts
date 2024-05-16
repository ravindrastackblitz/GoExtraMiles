import { Component } from '@angular/core';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-urben-rider-store-catalouge',
  templateUrl: './urben-rider-store-catalouge.component.html',
  styleUrls: ['./urben-rider-store-catalouge.component.css']
})
export class UrbenRiderStoreCatalougeComponent {
  details = JSON.parse(localStorage.getItem('form-data') || '{}');
  imagedata :string | null = null;
  discount!: boolean;
  togglePopup(): void {
    this.discount =true;
  }
  confirm(){
    this.discount =false;
    this.router.navigate(['/AddItem']);
  }
  cancle(){
    this.discount =false;
    this.router.navigate(['/UrbanRiderStoreCatalouge']);
  }
  constructor(private imageService: ImagesarviceService, private router: Router){
  }
  ngOnInit(){
    this.imagedata = this.imageService.getImageData();
   }
}
