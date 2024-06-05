import { Component,OnInit,Output,EventEmitter,Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../services/popup.service';
import { map, observable, Observable, startWith, Subscription } from 'rxjs';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BusinessCategoryService } from '../services/business-category.service';
import { SelectCategory } from '../Model/select-category';



@Component({
  selector: 'app-select-business-category',
  templateUrl: './select-business-category.component.html',
  styleUrls: ['./select-business-category.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectBusinessCategoryComponent),
      multi: true
    }
  ]
})
export class SelectBusinessCategoryComponent implements OnInit, ControlValueAccessor {

  myControl = new FormControl();
  selectedValue:any;
  filteredOptions!: Observable<string[]>;
  question = 'Would you like to add ';
  @Input() options!: any[];
  @Output() added = new EventEmitter();
  @Output() businessvalue = new EventEmitter();
  businesscategory:any[]=[]
  // Function to call when the option changes.
  onChange = (option: string) => {};

  // Function to call when the input is touched (when the autocomplete is clicked).
  onTouched = () => {};

constructor(private category:BusinessCategoryService){}
  get value() {
    return this.selectedValue;
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map((option: string) => option ? this.filter(option) : this.options.slice())
      );
  }

  optionSelected(option: { value: string; }) {
    if (option.value.indexOf(this.question) === 0) {
      let newOption = option.value.substring(this.question.length).split('?')[0];
      this.options.push(newOption);
      this.added.emit(newOption);
      this.myControl.setValue(newOption);
      this.writeValue(newOption);
    } else {
      this.myControl.setValue(option.value);
      console.log("cvcvvc",option.value);
      this.businessvalue.emit(option.value)
      this.writeValue(option.value);
    }
  }

  enter() {
    const controlValue = this.myControl.value;
    if (!this.options.some(entry => entry === controlValue)) {
      this.added.emit(controlValue);
      const index = this.options.push(controlValue);
      setTimeout(
        () => {
          this.myControl.setValue(controlValue);
          this.writeValue(controlValue);
        }
      );
    } else {
      this.writeValue(controlValue);
    }
  }

  // Allows Angular to update the model (option).
  // Update the model and changes needed for the view here.
  writeValue(option: string): void {
    this.selectedValue = option;
    this.onChange(option);
  }

  // Allows Angular to register a function to call when the model (rating) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (option: string) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private filter(value: string): string[] {
    let results;
    if (value) {
      results = this.options
        .filter(option => option.toLowerCase().indexOf(value.toLowerCase()) === 0);
      if (results.length < 1) {
        results = [this.question + value + '?'];
      }
    } else {
      results = this.options.slice();
    }
    return results;
  }
//   businesscategory:any=[];

// selectcategory!:FormGroup;
// selectedCategory:string="";

// @Output() eventemit:EventEmitter<string> = new EventEmitter();

// @Input('businesscategory') businessname!:string;
// filterTerm!: string;
// categoriesdata !:SelectCategory

//   showModal: boolean = false;
//   categoryName: string = '';
//   categories: { name: string }[] = [];


//   constructor( private popup:PopupService ,private formbuilder:FormBuilder,  private _router: Router,private category:BusinessCategoryService){
//     // this.subscription = this.popup.selectbusiness$.subscribe(business =>this.selectbusiness = business)
//   }


// ngOnInit(){
// this.selectcategory = this.formbuilder.group({
//     category : new FormControl('',Validators.required)
// })

// this.category.GetAllCategorys().subscribe(res => {
// //console.log("category",res);
// this.businesscategory =res
// })
// }

// Filterdata(event: any) {
//     const char = event.target.value.trim().toLowerCase(); 
//     this.category.GetAllCategorys().subscribe(res => {
//       const filteredResults = res.filter(item => item.label?.toLowerCase().includes(char) || item.value?.toLowerCase() === char);
//     //  console.log("Filtered results:", filteredResults);
//       this.businesscategory =filteredResults;
//     })
 
// }

// addcategory!:boolean;
// AddCategory(){
// this.addcategory=true;
// }

// closeDialog(){
//   this.addcategory = false;
// }
// onsubmit(){
//   // if(this.selectcategory.valid){
//   //   var res = this.selectcategory.value
//   //   localStorage.setItem('category', res.category);
//   //   this._router.navigate(['/CreateBusinessAccount']);
//   // }
// }
// categorys(){
//   if(this.selectcategory.valid){
//     var res = this.selectcategory.value;
//     this.selectedCategory = res.category
//     this.eventemit.emit( this.selectedCategory);   
//   }
//   this.category.GetAllCategorys().subscribe(res => {
//     this.businesscategory =res
//     })
// }
// close1(){
//   this.eventemit.emit( this.selectedCategory);
// }

//   showPopup() {
//     this.showModal = true;
//   }

//   closePopup() {
//     this.showModal = false;
//     this.categoryName = ''; // Reset the category name input
//   }

//   createCategory() {
//     if (this.categoryName.trim() !== '') {
//       const data : SelectCategory ={
//         label : this.categoryName,
//         value :this.categoryName
//       }
//       this.category.Create(data);
//    //   this.categories.push({ name: this.categoryName });
//       this.closePopup();
//     } else {
//       alert('Please enter a valid category name.');
//     }

//   }
 
//   ngOnChanges():void
//   {
//    // console.log("@Input values  ",this.businessname);
//     this.selectcategory?.controls['category'].setValue(this.businessname);
  
//   }
}
