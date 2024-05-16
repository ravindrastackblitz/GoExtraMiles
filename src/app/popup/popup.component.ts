import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
 constructor( private popup:PopupService,private dialogRef: MatDialogRef<PopupComponent>){}
 isdisabled!:boolean;
  closeDialog(){
  this.popup.setdisable(true);
  this.dialogRef.close();
  }
  
}
