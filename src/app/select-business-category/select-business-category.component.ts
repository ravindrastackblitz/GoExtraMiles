import { Component,OnInit,Output,EventEmitter,Pipe,PipeTransform  } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../services/popup.service';
import { observable, Observable, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BusinessCategoryService } from '../services/business-category.service';
import { SelectCategory } from '../Model/select-category';



@Component({
  selector: 'app-select-business-category',
  templateUrl: './select-business-category.component.html',
  styleUrls: ['./select-business-category.component.css']
})
export class SelectBusinessCategoryComponent implements PipeTransform {
  transform(businesscategory: any[], limit: number): any[] {
    return businesscategory.slice(0, 5);
  }
  businesscategory:any=[];

selectcategory!:FormGroup;
selectedCategory:string="";

@Output() eventemit:EventEmitter<string> = new EventEmitter();


filterTerm!: string;
categoriesdata !:SelectCategory

  showModal: boolean = false;
  categoryName: string = '';
  categories: { name: string }[] = [];


  constructor( private popup:PopupService ,private formbuilder:FormBuilder,  private _router: Router,private category:BusinessCategoryService){
    // this.subscription = this.popup.selectbusiness$.subscribe(business =>this.selectbusiness = business)
  }


ngOnInit(){
this.selectcategory = this.formbuilder.group({
    category : new FormControl('',Validators.required)
})

this.category.GetAllCategorys().subscribe(res => {
console.log("category",res);
this.businesscategory =res
})
 
}
Filterdata(event: any) {
console.log("entervalue :",event.target.value)
console.log(" charcode :",event.keyCode)
  const charCode = (event.which)?event.which:event.keyCode;
//   if(charCode === "BS"){
//     this.category.GetAllCategorys().subscribe(res => {
//       this.businesscategory =res
//   })
// }
  const char = event.target.value.trim().toLowerCase(); 
  if(char.keyCode === "08"){
   // console.log(" charcode :",char.keyCode)
    this.category.GetAllCategorys().subscribe(res => {
            this.businesscategory =res
        })
  }else{
    this.category.GetAllCategorys().subscribe(res => {
      const filteredResults = res.filter(item => item.label?.toLowerCase().includes(char) || item.value?.toLowerCase() === char);
      console.log("Filtered results:", filteredResults);
      this.businesscategory =filteredResults;
      });
  }

}

addcategory!:boolean;
AddCategory(){
this.addcategory=true;
}

closeDialog(){
  this.addcategory = false;
}
onsubmit(){
  // if(this.selectcategory.valid){
  //   var res = this.selectcategory.value
  //   localStorage.setItem('category', res.category);
  //   this._router.navigate(['/CreateBusinessAccount']);
  // }
}
categorys(){
  if(this.selectcategory.valid){
    var res = this.selectcategory.value;
    this.selectedCategory = res.category
    this.eventemit.emit( this.selectedCategory);   
  }
}
close1(){
  this.eventemit.emit( this.selectedCategory);
}

  showPopup() {
    this.showModal = true;
  }

  closePopup() {
    this.showModal = false;
    this.categoryName = ''; // Reset the category name input
  }

  createCategory() {
    if (this.categoryName.trim() !== '') {
      const data : SelectCategory ={
        label : this.categoryName,
        value :this.categoryName
      }
      this.category.Create(data);
   //   this.categories.push({ name: this.categoryName });
      this.closePopup();
    } else {
      alert('Please enter a valid category name.');
    }

  }
 
}
