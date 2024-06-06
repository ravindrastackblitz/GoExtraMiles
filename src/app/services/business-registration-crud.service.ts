
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { CreateBusinessAccount } from '../Model/create-business-account';
import { Observable,catchError,throwError,take,of, forkJoin } from 'rxjs';
import { finalize, map,switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class BusinessRegistrationCRUDService {
  private dbPath = '/BusinessRegistrations';
  number= localStorage.getItem('phoneNumber')
  businessRegistration: AngularFireList<CreateBusinessAccount>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) 
  {
    this.businessRegistration = db.list(this.dbPath);
  }
  
  pushFileToStorage(fileUpload: CreateBusinessAccount): Observable<any> {
    const fileStoragePath = `${this.dbPath}/${fileUpload.file.name}`;
    const gstStoragePath = `${this.dbPath}/${fileUpload.gstFile.name}`;
    const fileStorageRef = this.storage.ref(fileStoragePath);
    const gstStorageRef = this.storage.ref(gstStoragePath);
    const fileUploadTask = this.storage.upload(fileStoragePath, fileUpload.file);
    const gstUploadTask = this.storage.upload(gstStoragePath, fileUpload.gstFile);
    return forkJoin({
      fileUpload: fileUploadTask.snapshotChanges(),
      gstUpload: gstUploadTask.snapshotChanges()
    }).pipe(
      switchMap((result: any) => {
        return forkJoin({
          fileURL: fileStorageRef.getDownloadURL(),
          gstURL: gstStorageRef.getDownloadURL()
        });
      }),
      switchMap((urls: any) => {
        fileUpload.url = urls.fileURL;
        fileUpload.imagename = fileUpload.file.name;
        fileUpload.url2 = urls.gstURL;
        fileUpload.gstImageName = fileUpload.gstFile.name;
        return of(fileUpload);
      })
    );
  }

  create(businessReg: any) {
    return this.businessRegistration.push(businessReg);
  }

  getBusinessRecordByKey1(phonenumber:string): Observable<any> {
    return this.db.list('BusinessRegistrations/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
      ),
      map(businesses =>
        businesses.find(business => business.registrationnumber == phonenumber)
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
 
    });
  }

  updateBusinessBykey(key:string,newData:any){
    return this.businessRegistration.update(key, newData);
  }
}