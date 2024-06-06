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
  
  private saveFileData(catalogImage: CatalogImage): void {
    this.db.list(this.basePath).push(catalogImage);
  }
}
