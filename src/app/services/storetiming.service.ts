import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { catchError, tap, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { Storetimings } from '../Model/storetimings';

@Injectable({
  providedIn: 'root'
})
export class StoretimingService {
matcheddata:any[]=[];

    private dbPath = '/StoreTimings';
  StoreTimingService!: AngularFireList<Storetimings>;
 

    constructor(private db:AngularFireDatabase, private storage: AngularFireStorage) {
    this.StoreTimingService = db.list(this.dbPath);
  }


  create(data: any) {
    console.log("Store-Timings", data);
    return this.StoreTimingService.push(data);
  }

  stoetimeingarrayandkey: { storerecords: Storetimings[] | any[]; key: string } = { storerecords: [], key: '' };

getStoretimings(phone: string): Observable<any> {
  return this.db.list('/StoreTimings').snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Storetimings }))
    ),
    map(times => {
      this.matcheddata = times.filter(timesArray => {
        const some = Object.values(timesArray)
        const data = some.filter(x => x.RegistrationNumber === phone);
        if (data.length > 0) {
          var key = some[7];
          this.stoetimeingarrayandkey = { "storerecords": data, "key": key };
         // console.log("hjhjhj", this.stoetimeingarrayandkey);
        //  return this.stoetimeingarrayandkey;
        }
        return []
      });
      return this.stoetimeingarrayandkey;
    }),
    catchError(error => {
      console.error('Error retrieving business records:', error);
      throw error;
    })
  );
}


 deleteStoretimings(key:string){
  return this.StoreTimingService.remove(key);
 }


}


