import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { CatalogImage } from '../Model/catalog-image';
import { Observable, forkJoin } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogServiceService {

  private basePath = '/CatalogImages';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  pushFilesToStorage(catalogImages: CatalogImage[][]): Observable<number[]> {
    const uploadTasks: AngularFireUploadTask[] = [];
    const percentages: Observable<number>[] = [];

    catalogImages.forEach((imagesArray: CatalogImage[]) => {
      imagesArray.forEach((catalogImage: CatalogImage) => {
        console.log("hii");
        const filePath = `${this.basePath}/${catalogImage.file.name}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, catalogImage.file);

        const task = uploadTask.snapshotChanges().pipe(
         
          map(snapshot => ((snapshot ?? {}).bytesTransferred ?? 0) / ((snapshot ?? {}).totalBytes ?? 1) * 100),
          finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              catalogImage.url = downloadURL;
              catalogImage.name = catalogImage.file.name;
              this.saveFileData(catalogImage);
            });
          })
        );

        uploadTasks.push(uploadTask);
        percentages.push(task);
      });
    });

    // Combine all observables into one and return
    return forkJoin(percentages);
  }

  private saveFileData(catalogImage: CatalogImage): void {
    this.db.list(this.basePath).push(catalogImage);
  }
}
