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

  private dbPath = '/StoreTimings';
  StoreTimingService!: AngularFireList<Storetimings>;

    constructor(private db:AngularFireDatabase, private storage: AngularFireStorage) 
    {
      this.StoreTimingService = db.list(this.dbPath);
    }


  create(data: any) {
    console.log("Store-Timings", data);
    return this.StoreTimingService.push(data);
  }
  
  getStoretimings(phone: string): Observable<any> {
    return this.db.list('/StoreTimings').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
      ),
     
      map(times => {
        times.filter((t: any) => {

          const registrationNumber = t.RegistrationNumber; 
          return registrationNumber === phone;
        })
      }
      
      ),
      catchError(error => {
        console.error('Error retrieving business records:', error);
        return (error);
      })
    );
  }
 deleteStoretimings(phone:string){
  this.getStoretimings(phone).subscribe()
  return this.StoreTimingService.remove(phone);
 }
}
