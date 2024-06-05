
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

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.businessRegistration = db.list(this.dbPath);
  }
  


  // uploadFile(file: File): Observable<string> {
  //   const filePath = `${this.dbPath}/${file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   const uploadTask = this.storage.upload(filePath, file);

  //   return uploadTask.snapshotChanges().pipe(
  //     switchMap(() => {
  //       return storageRef.getDownloadURL();
  //     }),
  //     catchError(error => {
  //       console.error('Error uploading file:', error);
  //       return throwError(error);
  //     })
  //   );
  // }



  // uploadImage(image: File): Observable<string> {
  //   const imagePath = `${this.dbPath}/${image.name}`;
  //   const storageRef = this.storage.ref(imagePath);
  //   const uploadTask = this.storage.upload(imagePath, image);

  //   return uploadTask.snapshotChanges().pipe(
  //     switchMap(() => {
  //       return storageRef.getDownloadURL();
  //     }),
  //     catchError(error => {
  //       console.error('Error uploading image:', error);
  //       return throwError(error);
  //     })
  //   );
  // }




 
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
    console.log("service", businessReg);
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
      console.log('Business updated successfully');
      // Handle success, maybe redirect or show a success message
    });
  }

  updateBusinessBykey(key:string,newData:any){
    return this.businessRegistration.update(key, newData);
  }
  

}