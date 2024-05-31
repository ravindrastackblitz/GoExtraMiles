import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Storetimings } from '../Model/storetimings';

@Injectable({
  providedIn: 'root'
})
export class StoretimingService {

    private dbPath = '/StoreTimings';
  StoreTimingService!: AngularFireList<Storetimings>;

    constructor(private db:AngularFireDatabase, private storage: AngularFireStorage) {
    this.StoreTimingService = db.list(this.dbPath);
  }

  private dataSubject = new BehaviorSubject<string>('');
  public data$: Observable<string> = this.dataSubject.asObservable();

  sendData(data: string) {
    this.dataSubject.next(data);
  }

  create(data: any) {
    console.log("Store-Timings", data);
    return this.StoreTimingService.push(data);
  }
  
  getScratchcardByKey1(key:string): Observable<any> {
    return this.db.list('/StoreTimings').snapshotChanges().pipe(
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

}
