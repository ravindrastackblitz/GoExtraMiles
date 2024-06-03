import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
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
  
  getScratchcardByKey1(key:string): Observable<any> {
    return this.db.list('/ScratchCard').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
      ),
      map(scratchcards =>
        scratchcards.filter(cards => cards.productKey == key)
      ),
      catchError(error => {
        console.error('Error retrieving business records:', error);
        return ([]); // Return an empty array if an error occurs
      })
    );
  }

    
  getScratchcardByphone(phone:string): Observable<any> {
    return this.db.list('/ScratchCard').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
      ),
      map(scratchcards =>
        scratchcards.filter(cards => cards.registrationnumber == phone)
      ),
      catchError(error => {
        console.error('Error retrieving business records:', error);
        return ([]); // Return an empty array if an error occurs
      })
      
    );
  }


}
