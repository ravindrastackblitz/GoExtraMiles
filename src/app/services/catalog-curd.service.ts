import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { CatalogModel } from '../Model/catalog-model';
import { Observable, finalize, map ,forkJoin, switchMap, of,tap} from 'rxjs';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CatalogCURDService {
  private dbPath = '/Catalouges';
  number= localStorage.getItem('phoneNumber')

  catalogService: AngularFireList<CatalogModel>;

  


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

  

  // getFilesByPhoneNumber(phoneNumber: string,imagename:string): Observable<any> {
  //   this.catalogService = this.db.list(this.dbPath);
    
  //   // Querying the list based on the phone number
  //   return this.catalogService.snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  //     ),
  //     map(businesses =>{
  //       console.log("business",businesses)
  //     businesses.find(business => business.registrationnumber == this.number && business.name == imagename)
       
  //     }
         
  //     ),

  //   );
  // }


  // getFilesByPhoneNumber(phoneNumber: string, imageName: string): Observable<any> {
  //   this.catalogService = this.db.list(this.dbPath);
  
  //   // Querying the list based on the phone number
  //   return this.catalogService.snapshotChanges().pipe(
  //     map(changes =>
  //       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
  //     ),
  //     map(businesses => {
  //       const filteredBusinesses = businesses.filter(business => business.registrationnumber === phoneNumber && business.name === imageName);
  //       filteredBusinesses.forEach(business => {
  //         // Perform actions for each business
  //         console.log("Business key:", business.key);
  //         console.log("Business details:", business);
  //       });
  //       return filteredBusinesses; // Returning the filtered businesses
  //     })
  //   );
  // }
  

  getFilesByPhoneNumber(phoneNumber: any, imagename: any): Observable<any> {
    this.catalogService = this.db.list(this.dbPath);
    
    // Querying the list based on the phone number
    return this.catalogService.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ),
      
      map(businesses => {
        // Find the business matching the conditions
        var dd = businesses.filter((business:any)=> {
        
            business[0].registrationnumber == this.number && 
            business[0].name == imagename
          })
          console.log("HI",dd)
          localStorage.setItem("Data",JSON.stringify(dd))
          return dd;
       
            
    
      })
    
    );
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
