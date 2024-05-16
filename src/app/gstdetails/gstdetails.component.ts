// import { Component,OnInit,Output,EventEmitter } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import {Router} from '@angular/router'
// import { GstService } from '../gst.service';
// import { MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-gstdetails',
//   templateUrl: './gstdetails.component.html',
//   styleUrls: ['./gstdetails.component.css']
// })
// export class GSTDetailsComponent {
 
//   gstnumber!:FormGroup;
//   gst: any;
//   @Output() Gstnumber:EventEmitter<string> = new EventEmitter();
//   sendnumber:string="";

//   constructor(private formbuilder:FormBuilder,private _router:Router,private gstser:GstService,private dialogRef:MatDialogRef<GSTDetailsComponent>){}

// ngOnInit(){
//   this.gstnumber = this.formbuilder.group({
//     gst : new FormControl('',[Validators.required])
//   })
// }
// gstdetails(){
//   if(this.gstnumber.valid){
//   var res = this.gstnumber.value
//   localStorage.setItem('gstnumber',res.gst)
//   this._router.navigate(['/CreateBusinessAccount'])
//   }
// }

// onsubmit(){
//    if(this.gstnumber.valid){
//      var res = this.gstnumber.value
//      localStorage.setItem('gstnumber',res.gst)
//      this._router.navigate(['/CreateBusinessAccount'])
//   }
  
// }
// close(){
//   this.dialogRef.close();
// }
// closeDialog(){
//   this.Gstnumber.emit(this.sendnumber);
//   this.dialogRef.close();
// }

// }

import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { GstService } from '../services/gst.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-gstdetails',
  templateUrl: './gstdetails.component.html',
  styleUrls: ['./gstdetails.component.css']
})
export class GSTDetailsComponent {
 
  gstnumber!:FormGroup;
  gst: any;
  sendnumber:string="";

  showpopup!:boolean;
  constructor(private formbuilder:FormBuilder,private _router:Router,private gstser:GstService){}
  // constructor(private formbuilder:FormBuilder,private _router:Router,private gstser:GstService,private dialogRef:MatDialogRef){}

ngOnInit(){
  this.gstnumber = this.formbuilder.group({
    gst : new FormControl('',[Validators.required])
  })
}
gstdetails(){
  if(this.gstnumber.valid){
  var res = this.gstnumber.value
  localStorage.setItem('gstnumber',res.gst)
  this._router.navigate(['/CreateBusinessAccount'])
  }
}

onsubmit(){
   if(this.gstnumber.valid){
     var res = this.gstnumber.value
     localStorage.setItem('gstnumber',res.gst)
     this._router.navigate(['/CreateBusinessAccount'])
  }
  
  //  closeDialog(){
  //  this.gst.setdisable(true);
  //  this.dialogRef.close();
  //  }
  
}
close(){
 
}
closeDialog(){


}

}