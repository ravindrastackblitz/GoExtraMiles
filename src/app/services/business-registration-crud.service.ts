
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { CreateBusinessAccount } from '../Model/create-business-account';
import { Observable,catchError,throwError,take,of } from 'rxjs';
import { finalize, map,switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class BusinessRegistrationCRUDService {
  private dbPath = '/BusinessRegistrationDetails';
  number= localStorage.getItem('phoneNumber')

  businessRegistration: AngularFireList<CreateBusinessAccount>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.businessRegistration = db.list(this.dbPath);
  }

 

 

  // pushFileToStorage(fileUpload:CreateBusinessAccount ): Observable<number | undefined> {
  //   const filePath = `${this.dbPath}/${fileUpload.file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   const uploadTask = this.storage.upload(filePath, fileUpload.file);

  //   uploadTask.snapshotChanges().pipe(
  //     finalize(() => {
  //       storageRef.getDownloadURL().subscribe(downloadURL => {
  //         fileUpload.url = downloadURL;
  //         fileUpload.name = fileUpload.file.name;
          
  //         this.create(fileUpload);
  //       });
  //     })
  //   ).subscribe();

  //   return uploadTask.percentageChanges();
  // }

 
  pushFileToStorage(fileUpload: CreateBusinessAccount): Observable<any> {
    const filePath = `${this.dbPath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
    return uploadTask.snapshotChanges().pipe(
      switchMap(() => {
        return storageRef.getDownloadURL().pipe(
          switchMap(downloadURL => {
            fileUpload.url = downloadURL;
            fileUpload.imagename = fileUpload.file.name;
            return of(fileUpload);
          })
        );
      })
    );
  }
  




  create(businessReg: any) {
    console.log("service", businessReg);
    return this.businessRegistration.push(businessReg);
  }

  getBusinessRecordByKey1(phonenumber:string): Observable<any> {
    return this.db.list('BusinessRegistrationDetails/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
      ),
      map(businesses =>
        businesses.find(business => business.registrationnumber == this.number)
      ),
      catchError(error => {
        console.error('Error retrieving business records:', error);
        return ([]); // Return an empty array if an error occurs
      })
    );
  }

  updateBusinessByPhoneNumber(phoneNumber: string, newData: any) {
    this.getBusinessRecordByKey1(phoneNumber).pipe(
      take(1),
      switchMap(business => {
        if (business && business.key) { 
          const key = business.key;
          return this.businessRegistration.update(key, newData);
        } else {
          throw new Error('Invalid business data or key number');
        }
      }),
      catchError(error => {
        console.error('Error updating business:', error);
        return throwError(error); // Rethrow the error for handling in the calling component
      })
    ).subscribe(() => {
      console.log('Business updated successfully');
      // Handle success, maybe redirect or show a success message
    });
  }

  updateBusinessBykey(key:string,newData:any){
    return this.businessRegistration.update(key, newData);
  }
  

}