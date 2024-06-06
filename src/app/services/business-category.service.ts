import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { SelectCategory } from '../Model/select-category';
import {map} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class BusinessCategoryService {
  // private dbPath = 'Categories';
  private dbPath ='/Categories';
  BusinessCategories: AngularFireList<SelectCategory>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) 
    {
    this.BusinessCategories = db.list(this.dbPath);
    }

  GetAllCategorys(){
    this.BusinessCategories = this.db.list(this.dbPath);
    return this.BusinessCategories.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
  }

  Create(data:any){
  return this.BusinessCategories.push(data)
  } 
}
