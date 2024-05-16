import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CatalogImage } from '../Model/catalog-image';
import { CatalogServiceService } from '../services/catalog-service.service';
import { ImagesarviceService } from '../services/imagesarvice.service';
import { CatalogCURDService } from '../services/catalog-curd.service';
import { CatalogModel } from '../Model/catalog-model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  imagedata: any | string | ArrayBuffer | null = null;
  catalogDetails!:CatalogModel;
  selectedFiles: FileList[] = [];
  selectedImages: any[] = [];
  Additemdetails!: FormGroup| any;
  percentage = 0;
catalogUploads:any
  formdata:any;
  buttons!:boolean
  phone :any = localStorage.getItem('phoneNumber');

  constructor(private fb: FormBuilder, private _router: Router,
    private imageService: ImagesarviceService,
    private httpClient: HttpClient, private catalogService: CatalogServiceService,
    private catalogCrudService: CatalogCURDService,

    ) { }

  ngOnInit() {
    this.Additemdetails = this.fb.group({
      itemname: ['', Validators.required],
      description: ['', Validators.required],
      country: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(/^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,63})(\/\S*)?$/)]],
      retailprice: ['', Validators.required],
      sellingprice: ['', Validators.required]
    });

  }




AddvaluesToform(){
  if( this.formdata!= undefined){
    this.Additemdetails.patchValue({
      itemname:this.formdata.Itemname,
      description:this.formdata.Description,
      country:this.formdata.Country,
      link:this.formdata.Link,
      retailprice:this.formdata.Retailprice,
      sellingprice:this.formdata.SellingPrice

     
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
    const files: FileList | null = event.target.files;
    if (files) {
      this.selectedFiles[index] = files;
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




// Sumit() {
//   if (this.Additemdetails.valid && this.selectedFiles.length > 0) {
//     // Initialize array to hold CatalogModel objects
//     const catalogModels: CatalogModel[] = [];

//     // Iterate over selectedFiles to create CatalogModel objects
//     for (const files of this.selectedFiles) {
//       for (let i = 0; i < files.length; i++) {
//         const file: File = files.item(i)!;
//         const catalogModel: CatalogModel = {
//           Itemname: this.Additemdetails.value.itemname,
//           Description: this.Additemdetails.value.description,
//           Country: this.Additemdetails.value.country,
//           Link: this.Additemdetails.value.link,
//           SellingPrice: this.Additemdetails.value.retailprice,
//           Retailprice: this.Additemdetails.value.sellingprice,
//           registrationnumber: this.phone,
//           isApproved: false,
//           url: '', // If you're updating the URL after the files are uploaded, leave it empty for now
//           name: file.name,
//           name1:file.name,
//           name2:file.name,
//           file: file
//         };
      

//         this.catalogDetails= catalogModel;
//         console.log("CAtata" ,this.catalogDetails)
//         console.log("csjgd",catalogModel);
//         this.catalogCrudService.pushFilesToStorage(catalogModels).subscribe(

//            catalogImagesUpload => {
               
//                this.catalogUploads = catalogImagesUpload;
//                console.log('fileUpload details:', this.catalogUploads);
//                console.log("Hifsdjfnsa;dijfd    ",catalogImagesUpload);
            
//              },

          
//           // (percentages: number[]) => {
//           //   // Percentage changes for each file upload
//           //   console.log('Upload percentages:', percentages);
//           //   this.saveFormData();

//           // },
//           (error) => {
//             console.error('Error uploading files:', error);
//           },
          
//             // Once files are uploaded, save form data
          
//         );
   
//       }
    
//     }

//     // Upload files to storage
//   }
// }
Sumit() {
  if (this.Additemdetails.valid && this.selectedFiles.length > 0) {
    // Initialize array to hold CatalogModel objects
    const catalogModels: CatalogModel[] = [];

    // Iterate over selectedFiles to create CatalogModel objects
    for (const files of this.selectedFiles) {
      for (let i = 0; i < files.length; i++) {
        const file: File = files.item(i)!;
        const catalogModel: CatalogModel = {
          Itemname: this.Additemdetails.value.itemname,
          Description: this.Additemdetails.value.description,
          Country: this.Additemdetails.value.country,
          Link: this.Additemdetails.value.link,
          SellingPrice: this.Additemdetails.value.retailprice,
          Retailprice: this.Additemdetails.value.sellingprice,
          registrationnumber: this.phone,
          isApproved: false,
          url: '', // If you're updating the URL after the files are uploaded, leave it empty for now
          name: file.name,
          
          file: file
        };

        catalogModels.push(catalogModel);
      }
    }

    // Upload files to storage
    this.catalogCrudService.pushFilesToStorage(catalogModels).subscribe(
      catalogImagesUpload => {
        this.catalogUploads = catalogImagesUpload;
        console.log('fileUpload details:', this.catalogUploads);
        // Save form data once all files are uploaded
        this.saveFormData();
      },
      (error) => {
        console.error('Error uploading files:', error);
      }
    );
  }
}





saveFormData() {
  const formData = {
    Itemname: this.Additemdetails.value.itemname,
    Description: this.Additemdetails.value.description,
    Country: this.Additemdetails.value.country,
    Link: this.Additemdetails.value.link,
    SellingPrice: this.Additemdetails.value.retailprice,
    Retailprice: this.Additemdetails.value.sellingprice,
    registrationnumber: this.phone,
    isApproved: false,
    url: '', // If you're updating the URL after the files are uploaded, leave it empty for now
    key: '', // If you're using keys for database entries, leave it empty for now
    name: '', // If you're using names for database entries, leave it empty for now
    file: '',
    name2:'',
    name1:'',
  };

  // Save form data to database
  this.catalogCrudService.create(this.catalogUploads).then(() => {
    console.log('Data added successfully');
  }).catch((error: any) => {
    console.error('Error adding data:', error);
  });

  localStorage.setItem('AddItems', JSON.stringify(formData));
  this._router.navigate(['/ItemDetails']);
}



}