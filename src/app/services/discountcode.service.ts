import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Scratchcard } from '../Model/scratchcard';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class DiscountcodeService {
  private dbPath = '/ScratchCard';
  Scratchcardservice!: AngularFireList<Scratchcard>;

    constructor(private db:AngularFireDatabase, private storage: AngularFireStorage) {
    this.Scratchcardservice = db.list(this.dbPath);
  }

  private dataSubject = new BehaviorSubject<string>('');
  public data$: Observable<string> = this.dataSubject.asObservable();

  sendData(data: string) {
    this.dataSubject.next(data);
  }

  create(data: any) {
    console.log("scratch-cards", data);
    return this.Scratchcardservice.push(data);
  }
  

}
