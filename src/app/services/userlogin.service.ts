
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UserloginService {

  constructor(private http: HttpClient) { }

  private username: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private IsMainHeaderVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  public get getusername$(): Observable<string> { return this.username.asObservable(); };
  public get getIsMainHeaderVisible$(): Observable<boolean> { return this.IsMainHeaderVisible.asObservable(); };
 

  setusername(username: string) {
    this.username.next(username);
  }
  setIsMainHeaderVisible(IsMainHeaderVisible: boolean) {
    this.IsMainHeaderVisible.next(IsMainHeaderVisible)
  }

 
}
