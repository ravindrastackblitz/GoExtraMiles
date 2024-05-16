import { Injectable } from '@angular/core';
import { GSTDetailsComponent } from '../gstdetails/gstdetails.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { CreateBusinessAccountComponent } from '../create-business-account/create-business-account.component';
@Injectable({
  providedIn: 'root'
})
export class GstService {
  

  constructor(private dialog: MatDialog) {}
  private isdisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 

  public get getdisable$(): Observable<boolean> { return this.isdisabled.asObservable(); };

  setdisable(isdisabled: boolean) {
    this.isdisabled.next(isdisabled)
  }

  opengst() {
    this.dialog.open(GSTDetailsComponent);
  }
  closegst(){
    this.dialog.closeAll();
  }
  
}
