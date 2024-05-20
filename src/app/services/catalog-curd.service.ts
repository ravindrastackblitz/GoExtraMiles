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

pushFilesToStorage(catalogImages: CatalogModel[]): Observable<any[]> {
  const uploadTasks: Observable<any>[] = [];

  catalogImages.forEach((catalogImage: CatalogModel) => {
    const filePath = `${this.dbPath}/${catalogImage.file[0].name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, catalogImage.file);

    const task = uploadTask.snapshotChanges().pipe(
      switchMap(() => {
        return storageRef.getDownloadURL().pipe(
          switchMap(downloadURL => {
            catalogImage.urls = downloadURL;
            catalogImage.names = catalogImage.file[0].name;
            console.log("Download URL for", catalogImage.file[0].name, ":", downloadURL); // Log the download URL here
                  return of (catalogImage)// Save catalogModel to database after upload
          })
        );
      })
    );

    uploadTasks.push(task);
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
