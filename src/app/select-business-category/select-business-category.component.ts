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
  @Input() dropdownselected!:string;
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

  writeValue(option: string): void {
    this.selectedValue = option;
    this.onChange(option);
  }

  registerOnChange(fn: (option: string) => void): void {
    this.onChange = fn;
  }
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

  ngOnChanges():void
  {
   this.myControl.setValue(this.dropdownselected);
  
  }
}