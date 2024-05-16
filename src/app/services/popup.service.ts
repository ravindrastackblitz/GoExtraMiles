import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private dialog: MatDialog) {}
  private isdisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
 
  public get getdisable$(): Observable<boolean> { return this.isdisabled.asObservable(); };

  setdisable(isdisabled: boolean) {
    this.isdisabled.next(isdisabled)
  }

  openPopup() {
    this.dialog.open(PopupComponent);
  }
   
}
