import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { CatalogModel } from '../Model/catalog-model';
import { Observable, finalize, map ,forkJoin, switchMap, of} from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CatalogCURDService {
  private dbPath = '/CatalougeDetails';
  number= localStorage.getItem('phoneNumber')
d:any;
  catalogService: AngularFireList<CatalogModel>;

  


  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
     this.d = db.list(this.dbPath);
     console.log("Sai",this.d)
    this.catalogService = this.d;
    console.log("Ravi", this.catalogService)
   }

pushFilesToStorage(catalogImages: CatalogModel[]): Observable<any[]> {
    const uploadTasks: Observable<any>[] = [];

    catalogImages.forEach((catalogImage: CatalogModel) => {
      const filePath = `${this.dbPath}/${catalogImage.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, catalogImage.file);
      
      const task = uploadTask.snapshotChanges().pipe(
        switchMap(() => {
          return storageRef.getDownloadURL().pipe(
            switchMap(downloadURL => {
              catalogImage.url = downloadURL;
              catalogImage.name = catalogImage.file.name;
              console.log("Download URL for", catalogImage.file.name, ":", downloadURL); // Log the download URL here
              return of(catalogImage);
            })
          );
        })
      );

      uploadTasks.push(task);
    });

    // Use forkJoin to wait for all upload tasks to complete
    return forkJoin(uploadTasks);
}


  
  create(catalogDetails: CatalogModel): any {
    return this.catalogService.push(catalogDetails);
  }


  getBusinessByPhoneNumber(): Observable<any> {
    this.catalogService = this.db.list(this.dbPath);
    
    // Querying the list based on the phone number
    return this.catalogService.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    //   map(businesses =>
    //       businesses.find(business => business.registrationnumber == this.number)
    //   )
     );
  }

  

  getFilesByPhoneNumber(phoneNumber: string): Observable<any> {
    this.catalogService = this.db.list(this.dbPath);
    
    // Querying the list based on the phone number
    return this.catalogService.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ),
      map(businesses =>
          businesses.find(business => business.registrationnumber == this.number)
      )
    );
  }
getImagesByPhoneNumber(): Observable<CatalogModel[]> {
  return this.db.list<CatalogModel>(this.dbPath).valueChanges();
}


}
