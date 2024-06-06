import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { BehaviorSubject, Observable, Subject, catchError, forkJoin, map, of, switchMap, throwError } from 'rxjs';
import { CreateBusinessAccountComponent } from '../create-business-account/create-business-account.component';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { CreateBusinessAccount } from '../Model/create-business-account';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class GstService {
  private dbPath = '/BusinessRegistrations';
  number= localStorage.getItem('phoneNumber')
  gstmodel: AngularFireList<CreateBusinessAccount>;
  private isdisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public get getdisable$(): Observable<boolean> { return this.isdisabled.asObservable(); };

  constructor(private dialog: MatDialog,private db: AngularFireDatabase, private storage: AngularFireStorage) 
  {
    this.gstmodel = db.list(this.dbPath);
  }

  
  pushFilesToStorage(fileLists: FileList[]): Observable<any> {
    const uploadTasks: Observable<any>[] = [];
    fileLists.forEach(fileList => {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const filePath = `${this.dbPath}/${file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, file);
        uploadTasks.push(uploadTask.snapshotChanges().pipe(
          switchMap(() => {
            return storageRef.getDownloadURL().pipe(
              map(downloadURL => ({ url: downloadURL, imageName: file.name }))
            );
          })
        ));
      }
    });
    return forkJoin(uploadTasks);
  }

  pushGstFile(fileUpload: CreateBusinessAccount): Observable<any> {
    const filePath = `${this.dbPath}/${fileUpload.gstFile.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    return uploadTask.snapshotChanges().pipe(
      switchMap(() => {
        return storageRef.getDownloadURL().pipe(
          switchMap(downloadURL => {
            fileUpload.url = downloadURL;
            fileUpload.imagename = fileUpload.gstFile.name;
            return of(fileUpload);
          })
        );
      })
    );
  }

  create(gstImage: any) {
    return this.gstmodel.push(gstImage);
  }


  getgstFile(phonenumber:string): Observable<any> {
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



















  setdisable(isdisabled: boolean) {
    this.isdisabled.next(isdisabled)
  }

  
  closegst(){
    this.dialog.closeAll();
  }
  
}
