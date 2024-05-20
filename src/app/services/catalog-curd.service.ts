import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { CatalogModel } from '../Model/catalog-model';
import { Observable, finalize, map ,forkJoin, switchMap, of,tap, catchError, BehaviorSubject} from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CatalogCURDService {
  private dbPath = '/Catalouges';
  number= localStorage.getItem('phoneNumber')

  catalogService: AngularFireList<CatalogModel>;

  

  private Key = new BehaviorSubject<string>('');
  public data$: Observable<string> = this.Key.asObservable();

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.catalogService = db.list(this.dbPath);
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



  
  create(catalogDetails: CatalogModel): any {
    return this.catalogService.push(catalogDetails);
  }


  getBusinessByPhoneNumber(): Observable<any> {
    this.catalogService = this.db.list(this.dbPath);
    
    return this.catalogService.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
     );
  }

  

  

  getFilesByPhoneNumber(phoneNumber: string,keyName:string): Observable<any> {
    return this.db.list('Catalouges/').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as any }))
      ),
      map(businesses =>
        businesses.find(business => business.registrationnumber == phoneNumber && business.key == keyName)
      ),
      catchError(error => {
        console.error('Error retrieving business records:', error);
        return ([]); // Return an empty array if an error occurs
      })
    );
    }
  
    setKey(key: string) {
      this.Key.next(key);
    }

getImagesByPhoneNumber(): Observable<CatalogModel[]> {
  return this.db.list<CatalogModel>(this.dbPath).valueChanges();
}


delete(key: string): Observable<any> {
     
  this.catalogService = this.db.list(this.dbPath);
  return this.catalogService.snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ))
}


}
